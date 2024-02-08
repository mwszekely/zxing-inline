
import { encode, scanAll, waitUntilReady } from "./thread-interop.js";

export interface QrEncoderOptions {
    document?: Document;
}

export interface EncodeOptions {
    /**
     * Defaults to 4 if unspecified, or 8 if a cutout is requested.
     */
    errorCorrection?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    /**
     * This will be drawn over the QR code in the center. If the resulting image is not scannable, no image will be drawn.
     * 
     * They should be *very* small (on the order of 10x10 pixels), as no scaling is done. 
     * 
     * By providing multiple, the largest will be tried until one works.
     */
    cutoutImages?: ArrayOrT<Exclude<CanvasImageSource, HTMLOrSVGImageElement | VideoFrame>>;
}

type ArrayOrT<T> = T | T[];

const t = new TextEncoder();
export class QrEncoder {
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;

    constructor({ document }: QrEncoderOptions = {}) {
        document ??= window.document;
        this._canvas = document.createElement("canvas");
        this._canvas.style.display = 'none';
        document.body.appendChild(this._canvas);
        this._context = this._canvas.getContext('2d', { willReadFrequently: true })!;
    }

    async encode(inputData: Int8Array, options?: EncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8Array, options?: EncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8ClampedArray, options?: EncodeOptions): Promise<Blob>;
    async encode(inputData: string, options?: EncodeOptions): Promise<Blob>;
    async encode(inputData: Int8Array | Uint8Array | Uint8ClampedArray | string, { errorCorrection, cutoutImages }: EncodeOptions = {}): Promise<Blob> {
        await waitUntilReady();

        errorCorrection ||= (cutoutImages ? 8 : 4);

        const parsedData = new Uint8ClampedArray(typeof inputData == 'string' ? t.encode(inputData) : inputData);
        let { data, width, height } = await encode(parsedData, typeof inputData == 'string' ? 'utf8' : 'binary', errorCorrection);
        const bmp = await createImageBitmap(new ImageData(new Uint8ClampedArray(data!), width, height), {});
        this._canvas.width = width;
        this._canvas.height = height;
        this._context = this._canvas.getContext('2d', { willReadFrequently: true })!;
        this._context.canvas
        this._context.save();
        this._context.imageSmoothingEnabled = false;
        this._context.imageSmoothingQuality = 'low';    // TODO: Unnecessary?
        this._context.drawImage(bmp, 0, 0, width, height, 0, 0, width, height);

        const sortedByArea = !cutoutImages ? [] : Array.isArray(cutoutImages) ? [...cutoutImages].sort((lhs, rhs) => { return (rhs.height * rhs.width) - (lhs.height * lhs.width); }) : [cutoutImages];
        let foundAnyCutout = false;
        const qrImageDataBeforeCutoutBg = await createImageBitmap(this._context.getImageData(0, 0, width, height, { colorSpace: 'srgb' }));

        if (cutoutImages) {
            for (let c of sortedByArea) {
                this._context.clearRect(0, 0, width, height);
                this._context.drawImage(qrImageDataBeforeCutoutBg, 0, 0);
                const left = Math.floor((width / 2) - (c.width / 2));
                const top = Math.floor((height / 2) - (c.height / 2));
                this._context.drawImage(c, 0, 0, c.width, c.height, left, top, c.width, c.height);
                const results = await scanAll(this._context.getImageData(0, 0, width, height).data, width, height);
                if (results.length) {
                    foundAnyCutout = true;
                    break;
                }
            }
        }

        if (!foundAnyCutout) {
            this._context.drawImage(qrImageDataBeforeCutoutBg, 0, 0);
        }

        const b = await new Promise<Blob | null>(resolve => this._canvas.toBlob(resolve, "image/png"));
        this._context.restore();
        return b!;
    }

    [Symbol.dispose]() {
        this._canvas.remove();
    }
}
