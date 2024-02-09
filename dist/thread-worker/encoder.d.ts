import { WritableBarcodeFormats } from "./barcode-formats.js";
interface EncodeResultNormal {
    data: ArrayBuffer;
    width: number;
    height: number;
    error?: undefined;
}
interface EncodeResultError {
    data: null;
    width?: undefined;
    height?: undefined;
    error: 'wasm-not-instantiated' | 'empty-input';
}
type EncodeResult = EncodeResultNormal | EncodeResultError;
export declare function encode(data: Uint8ClampedArray, encoding: "binary" | "utf8", format: WritableBarcodeFormats, ecc: number): EncodeResult;
export {};
//# sourceMappingURL=encoder.d.ts.map