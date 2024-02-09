import { BarcodeEncoderBase, BarcodeEncoderOptions } from "./encoder.js";
export type QrErrorCorrectionLevel = '1L' | '2M' | '3Q' | '4H';
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
    cutoutImages?: ArrayOrT<Exclude<CanvasImageSource, HTMLOrSVGImageElement | VideoFrame>>;
}
/**
 * Encodes data into a QR code.
 */
export declare class QrEncoder extends BarcodeEncoderBase<CanvasRenderingContext2D> {
    constructor({ document }?: BarcodeEncoderOptions);
    encode(inputData: Int8Array, options?: QrEncodeOptions): Promise<Blob>;
    encode(inputData: Uint8Array, options?: QrEncodeOptions): Promise<Blob>;
    encode(inputData: Uint8ClampedArray, options?: QrEncodeOptions): Promise<Blob>;
    encode(inputData: string, options?: QrEncodeOptions): Promise<Blob>;
    [Symbol.dispose](): void;
}
export {};
//# sourceMappingURL=qr-encoder.d.ts.map