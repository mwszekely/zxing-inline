import {
    NativeUint8ClampedArray,
    getInstanceExports,
    getMemory
} from "basic-event-wasi";
import { ReadableBarcodeFormats, convertFormat } from "./barcode-formats.js";
import { getWasmSync } from "./instance.js";
import { ScanResult, ScanResultCoordinate } from "./shared.js";

let arrayInWasmForCameraImageData: NativeUint8ClampedArray | undefined = undefined;

function getCameraBuffer() {
    const { instance } = getWasmSync()!;
    if (instance && arrayInWasmForCameraImageData == undefined) {
        return arrayInWasmForCameraImageData = new NativeUint8ClampedArray(instance, null);
    }
    return arrayInWasmForCameraImageData;
}


function* scan(rgbaImageData: Uint8ClampedArray, width: number, height: number, format: ReadableBarcodeFormats = "QRCode") {
    const { instance } = getWasmSync()!;
    const arrayInWasmForCameraImageData = getCameraBuffer();

    if (instance == null || arrayInWasmForCameraImageData == null)
        return null;

    arrayInWasmForCameraImageData.resize(rgbaImageData.length);
    arrayInWasmForCameraImageData.set(rgbaImageData);
    let resultCount = getInstanceExports(instance).scan(arrayInWasmForCameraImageData.address!, width, height, convertFormat(format), true);

    for (let i = 0; i < resultCount; ++i) {
        const stringLength = getInstanceExports(instance).currentResultTextLength();
        const pointerToCStr = getInstanceExports(instance).readCurrentResultText();
        const dataLength = getInstanceExports(instance).currentResultDataLength();
        const pointerToData = getInstanceExports(instance).readCurrentResultData();
        const orientation = getInstanceExports(instance).currentResultOrientation();
        const hash = getInstanceExports(instance).currentResultHash();
        const positions = ([0, 1, 2, 3] as const).map(i => ({
            x: getInstanceExports(instance!).positionOfCurrentResultX(i),
            y: getInstanceExports(instance!).positionOfCurrentResultY(i),
        })) as [ScanResultCoordinate, ScanResultCoordinate, ScanResultCoordinate, ScanResultCoordinate];

        const text = (new TextDecoder("utf-8")).decode(new Uint8Array(getMemory(instance).buffer, pointerToCStr, stringLength));
        const dataBuffer = new ArrayBuffer(dataLength);
        const data = new Uint8Array(dataBuffer);
        data.set(new Uint8Array(getInstanceExports(instance).memory.buffer, pointerToData, dataLength));

        getInstanceExports(instance).nextResult();

        let ret: ScanResult = {
            text,
            data,
            positions,
            orientation,
            hash
        }

        yield ret;
    }
}

export function scanAll(rgbaImageData: Uint8ClampedArray, width: number, height: number, format: ReadableBarcodeFormats = "QRCode"): ScanResult[] {
    return [...scan(rgbaImageData, width, height, format)]
}