import {
    NativeUint8ClampedArray,
    getInstanceExports
} from "basic-event-wasi";
import { transfer } from "comlink";
import { getWasmSync } from "./instance.js";

let arrayInWasmForEncodeSourceData: NativeUint8ClampedArray | undefined = undefined;
function getEncodeSourceBuffer() {
    const { instance } = getWasmSync()!;
    if (instance && arrayInWasmForEncodeSourceData == undefined) {
        return arrayInWasmForEncodeSourceData = new NativeUint8ClampedArray(instance, null);
    }
    return arrayInWasmForEncodeSourceData;
}

export function encode(data: Uint8ClampedArray, format: "binary" | "utf8", ecc: number) {
    const { instance } = getWasmSync()!;
    const encodeBuffer = getEncodeSourceBuffer()

    if (instance == null || encodeBuffer == null)
        return { data: null, width: 0, height: 0 };

    encodeBuffer.assign(data);

    const qrFormat = getInstanceExports(instance).formatQRCode();
    const csBinary = getInstanceExports(instance).characterSetBINARY();
    const csUtf8 = getInstanceExports(instance).characterSetUTF8();
    getInstanceExports(instance).generate(encodeBuffer.address!, data.byteLength, format == "binary"? csBinary : csUtf8, qrFormat, ecc);

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