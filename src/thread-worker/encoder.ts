import {
    NativeUint8ClampedArray,
    getInstanceExports
} from "basic-event-wasi";
import { transfer } from "comlink";
import { WritableBarcodeFormats, convertFormat } from "./barcode-formats.js";
import { getWasmSync } from "./instance.js";

let arrayInWasmForEncodeSourceData: NativeUint8ClampedArray | undefined = undefined;
function getEncodeSourceBuffer() {
    const { instance } = getWasmSync()!;
    if (instance && arrayInWasmForEncodeSourceData == undefined) {
        return arrayInWasmForEncodeSourceData = new NativeUint8ClampedArray(instance, null);
    }
    return arrayInWasmForEncodeSourceData;
}

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
    error: 'wasm-not-instantiated' | 'empty-input'
}

type EncodeResult = EncodeResultNormal | EncodeResultError;

export function encode(data: Uint8ClampedArray, encoding: "binary" | "utf8", format: WritableBarcodeFormats, ecc: number): EncodeResult {
    const { instance } = getWasmSync()!;
    const encodeBuffer = getEncodeSourceBuffer()

    if (instance == null || encodeBuffer == null)
        return { data: null, error: 'wasm-not-instantiated' };

    if (data.length == 0 || data == null)   // ZXing explicitly throws on a zero-length array, so check for that.
        return { data: null, error: 'empty-input' };

    encodeBuffer.assign(data);

    const csBinary = getInstanceExports(instance).characterSetBINARY();
    const csUtf8 = getInstanceExports(instance).characterSetUTF8();
    getInstanceExports(instance).generate(encodeBuffer.address!, data.byteLength, encoding == "binary" ? csBinary : csUtf8, convertFormat(format), ecc);

    // Copy the image from WASM memory to JS memory
    const generatedImagePtr = getInstanceExports(instance).getGeneratedImageData();
    const generatedImageLength = getInstanceExports(instance).getGeneratedImageLength();
    const generatedImageWidth = getInstanceExports(instance).getGeneratedImageWidth();
    const generatedImageHeight = getInstanceExports(instance).getGeneratedImageHeight();
    const input = new Uint8ClampedArray(getInstanceExports(instance).memory.buffer, generatedImagePtr, generatedImageLength);
    const output = new Uint8ClampedArray(new ArrayBuffer(generatedImageLength));
    output.set(input);

    //const img = new ImageData(output, generatedImageWidth, generatedImageHeight);
    return transfer({
        data: output.buffer,
        width: generatedImageWidth,
        height: generatedImageHeight,
    }, [output.buffer])
}