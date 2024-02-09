
import { WritableBarcodeFormats } from "../thread-worker/barcode-formats.js";
import { encode, waitUntilReady } from "./thread-interop.js";

export interface BarcodeEncoderOptions {
    document?: Document;
}
export interface BarcodeEncoderBaseOptions<CTX extends CanvasRenderingContext2D | ImageBitmapRenderingContext> extends BarcodeEncoderOptions {
    id: CTX extends ImageBitmapRenderingContext ? 'bitmaprenderer' : '2d';
}

const textEncoder = new TextEncoder();

/**
 * Creates a <canvas> (necessary for creating a Blob)
 * and also the boilerplate for creating a bitmap.
 */
export class BarcodeEncoderBase<CTX extends CanvasRenderingContext2D | ImageBitmapRenderingContext> {
    protected _canvas: HTMLCanvasElement;
    protected _context: CTX;
    private _id: CTX extends ImageBitmapRenderingContext ? 'bitmaprenderer' : '2d';

    constructor({ document, id }: BarcodeEncoderBaseOptions<CTX>) {
        this._id = id;
        document ??= window.document;
        this._canvas = document.createElement("canvas");
        this._canvas.style.display = 'none';
        document.body.appendChild(this._canvas);
        const willReadFrequently = (id == '2d');
        this._context = this._canvas.getContext(this._id, { willReadFrequently })! as CTX;
    }

    private resetCanvas(width: number, height: number) {
        this._canvas.width = width;
        this._canvas.height = height;
        const willReadFrequently = (this._id == '2d');
        this._context = this._canvas.getContext(this._id, { willReadFrequently })! as CTX;
    }


    protected async encodeBasic(inputData: string | Uint8Array | Int8Array | Uint8ClampedArray, format: WritableBarcodeFormats, eccNumeric: number): Promise<ImageBitmap> {

        const parsedData = new Uint8ClampedArray(typeof inputData == 'string' ? textEncoder.encode(inputData) : inputData);
        let { data, width, height, error } = await encode(parsedData, typeof inputData == 'string' ? 'utf8' : 'binary', format, eccNumeric);
        if (error || !width || !height || !data) {  // The extra checks are just for TS, we could just check error otherwise...
            throw new EmptyInputError();
        }

        this.resetCanvas(width, height);
        return await createImageBitmap(new ImageData(new Uint8ClampedArray(data!), width, height), {});
    }
}


/**
 * Only thrown if you try to encode a QR code with 0-length data.
 */
export class EmptyInputError extends Error {
    constructor() {
        super("The given input to encode was empty (had 0 length).")
    }
}

export interface GenericEncodeOptions {
    errorCorrection?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    format: WritableBarcodeFormats;
}

/**
 * Allows the creation of any kind of supported barcode, not just
 * QR codes.
 */
export class BarcodeEncoder extends BarcodeEncoderBase<ImageBitmapRenderingContext> {
    constructor({ document }: BarcodeEncoderOptions = { document: window.document }) {
        super({ document, id: 'bitmaprenderer' });
    }
    async encode(inputData: Int8Array, options?: GenericEncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8Array, options?: GenericEncodeOptions): Promise<Blob>;
    async encode(inputData: Uint8ClampedArray, options?: GenericEncodeOptions): Promise<Blob>;
    async encode(inputData: string, options?: GenericEncodeOptions): Promise<Blob>;
    async encode(inputData: Int8Array | Uint8Array | Uint8ClampedArray | string, { format, errorCorrection }: GenericEncodeOptions = { format: "QRCode" }): Promise<Blob> {
        await waitUntilReady();

        errorCorrection ||= 5;
        const bmp = await this.encodeBasic(inputData, format, errorCorrection);
        this._context.transferFromImageBitmap(bmp);
        return (await new Promise<Blob | null>(resolve => this._canvas.toBlob(resolve, "image/png")))!;
    }
}