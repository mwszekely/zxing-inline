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
export declare class QrEncoder {
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    constructor({ document }?: QrEncoderOptions);
    encode(inputData: Int8Array, options?: EncodeOptions): Promise<Blob>;
    encode(inputData: Uint8Array, options?: EncodeOptions): Promise<Blob>;
    encode(inputData: Uint8ClampedArray, options?: EncodeOptions): Promise<Blob>;
    encode(inputData: string, options?: EncodeOptions): Promise<Blob>;
    [Symbol.dispose](): void;
}
export {};
//# sourceMappingURL=../../src/dist/thread-main/qr-encoder.d.ts.map