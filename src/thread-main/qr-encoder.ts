
import { BarcodeEncoderBase, BarcodeEncoderOptions } from "./encoder.js";
import { scanAll, waitUntilReady } from "./thread-interop.js";


export type QrErrorCorrectionLevel = '1L' | '2M' | '3Q' | '4H';

const ECCMap: Record<QrErrorCorrectionLevel, number> = {
    "1L": 1,
    "2M": 3,
    "3Q": 5,
    "4H": 7
}

type ArrayOrT<T> = T | T[];

export interface QrEncodeOptions {
    /**
     * From least to most robust: L, M, Q, H.
     */
    errorCorrection?: QrErrorCorrectionLevel;

    /**
     * This will be drawn over the QR code in the center. If the resulting image is not scannable, no image will be drawn.
     * 
     * They should be *very* small (on the order of 10x10 pixels), as no scaling is done. 
     * 
     * By providing multiple, the largest will be tried until one works.
     */
    cutoutImages?: ArrayOrT<HTMLImageElement | Exclude<CanvasImageSource, HTMLOrSVGImageElement | VideoFrame>>;

    /**
     * If provided, the image will be scaled by the given amount. Must be an integer greater than 0.
     * 
     * The use-case for this is to avoid image smoothing when copying and pasting, e.g. into Microsoft Word or similar.
     */
    sizeMultiplier?: number;
}

/**
 * Encodes data into a QR code.
 */
export class QrEncoder extends BarcodeEncoderBase<CanvasRenderingContext2D> {

    constructor({ document }: BarcodeEncoderOptions = { document: window.document }) {
        super({ document, id: "2d" })
    }

    async encode(inputData: Int8Array, options?: QrEncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8Array, options?: QrEncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8ClampedArray, options?: QrEncodeOptions): Promise<Blob>;
    async encode(inputData: string, options?: QrEncodeOptions): Promise<Blob>;
    async encode(inputData: Int8Array | Uint8Array | Uint8ClampedArray | string, { errorCorrection, cutoutImages, sizeMultiplier }: QrEncodeOptions = {}): Promise<Blob> {
        await waitUntilReady();

        errorCorrection ||= '2M';
        sizeMultiplier ||= 1;
        const eccNumeric = (ECCMap[errorCorrection] || ECCMap["2M"]);
        const bmp = await this.encodeBasic(inputData, "QRCode", eccNumeric);
        const { width: originalWidth, height: originalHeight } = bmp;
        const width = originalWidth * sizeMultiplier;
        const height = originalHeight * sizeMultiplier;

        this._canvas.width = width;
        this._canvas.height = height;
        this._context = this._canvas.getContext('2d', { willReadFrequently: true })!;
        this._context.canvas
        this._context.save();
        this._context.imageSmoothingEnabled = false;
        this._context.imageSmoothingQuality = 'low';    // TODO: Unnecessary?
        this._context.drawImage(bmp, 0, 0, originalWidth, originalHeight, 0, 0, width, height);

        const sortedByArea = !cutoutImages ? [] : Array.isArray(cutoutImages) ? [...cutoutImages].sort((lhs, rhs) => { return (rhs.height * rhs.width) - (lhs.height * lhs.width); }) : [cutoutImages];
        let foundAnyCutout = false;
        const qrImageDataBeforeCutoutBg = await createImageBitmap(this._context.getImageData(0, 0, width, height, { colorSpace: 'srgb' }));

        if (cutoutImages) {
            for (let c of sortedByArea) {
                this._context.clearRect(0, 0, width, height);
                this._context.drawImage(qrImageDataBeforeCutoutBg, 0, 0);
                const left = Math.floor((width / 2) - (c.width * sizeMultiplier / 2));
                const top = Math.floor((height / 2) - (c.height * sizeMultiplier / 2));
                this._context.drawImage(c, 0, 0, c.width, c.height, left, top, c.width * sizeMultiplier, c.height * sizeMultiplier);
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


