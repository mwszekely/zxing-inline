
import { ReadableBarcodeFormats } from "../thread-worker/barcode-formats.js";
import type { ScanResult } from "../thread-worker/shared.js";
import { CameraStreamer, CameraStreamerConstructorOptions } from "./camera-streamer.js";
import { scanAll, waitUntilReady } from "./thread-interop.js";

export interface BarcodeScannerConstructorOptions extends CameraStreamerConstructorOptions {
}

/**
 * Create a `QrScanner` with a pre-existing <video> and <canvas> element
 * that it will take control of.
 * 
 * Then, call `changeMedia` to request, e.g., the environmental-facing camera. It will be drawn to the video element.
 * 
 * You can then call `scan`, which will return a promise to any scanned QR codes in the camera's view at that time (and capture the video element's data to the canvas element, incidentally).
 * 
 * This class is disposable, meaning you should either do `using scanner = new QrScanner();`, or whatever is framework-appropriate (e.g. for React `useEffect(() => { const scanner = new QrScanner(); return () => scanner[Symbol.dispose](); })`)
 */
export class BarcodeScanner implements Pick<CameraStreamer, "changeMedia" | "getLastCapture"> {
    private _streamer: CameraStreamer;

    constructor(opts: Omit<BarcodeScannerConstructorOptions, "constraints"> = {}) {
        this._streamer = new CameraStreamer(opts);
    }

    async changeMedia(constraints: MediaStreamConstraints = { video: { facingMode: 'environment' } }) { return await this._streamer.changeMedia(constraints); }
    getLastCapture(): ImageData | null { return this._streamer.getLastCapture(); }

    async scanOnce(format: ReadableBarcodeFormats = "QRCode"): Promise<ScanResult[]> {
        await this._streamer.waitForPageResume();
        await waitUntilReady();
        const data = await this._streamer.capture();
        return await scanAll(data.data, data.width, data.height, format);
    }

    [Symbol.dispose]() {
        this._streamer[Symbol.dispose]();
    }
}

