import { WritableBarcodeFormats } from "../thread-worker/barcode-formats.js";
export interface BarcodeEncoderOptions {
    document?: Document;
}
export interface BarcodeEncoderBaseOptions<CTX extends CanvasRenderingContext2D | ImageBitmapRenderingContext> extends BarcodeEncoderOptions {
    id: CTX extends ImageBitmapRenderingContext ? 'bitmaprenderer' : '2d';
}
/**
 * Creates a <canvas> (necessary for creating a Blob)
 * and also the boilerplate for creating a bitmap.
 */
export declare class BarcodeEncoderBase<CTX extends CanvasRenderingContext2D | ImageBitmapRenderingContext> {
    protected _canvas: HTMLCanvasElement;
    protected _context: CTX;
    private _id;
    constructor({ document, id }: BarcodeEncoderBaseOptions<CTX>);
    private resetCanvas;
    protected encodeBasic(inputData: string | Uint8Array | Int8Array | Uint8ClampedArray, format: WritableBarcodeFormats, eccNumeric: number): Promise<ImageBitmap>;
}
/**
 * Only thrown if you try to encode a QR code with 0-length data.
 */
export declare class EmptyInputError extends Error {
    constructor();
}
export interface GenericEncodeOptions {
    errorCorrection?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    format: WritableBarcodeFormats;
}
/**
 * Allows the creation of any kind of supported barcode, not just
 * QR codes.
 */
export declare class BarcodeEncoder extends BarcodeEncoderBase<ImageBitmapRenderingContext> {
    constructor({ document }?: BarcodeEncoderOptions);
    encode(inputData: Int8Array, options?: GenericEncodeOptions): Promise<Blob>;
    encode(inputData: Uint8Array, options?: GenericEncodeOptions): Promise<Blob>;
    encode(inputData: Uint8ClampedArray, options?: GenericEncodeOptions): Promise<Blob>;
    encode(inputData: string, options?: GenericEncodeOptions): Promise<Blob>;
}
//# sourceMappingURL=encoder.d.ts.map