import type { ScanResult } from "../thread-worker/shared.js";
import { CameraStreamer, CameraStreamerConstructorOptions } from "./camera-streamer.js";
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
export declare class QrScanner implements Pick<CameraStreamer, "changeMedia" | "getLastCapture"> {
    private _streamer;
    static create(opts?: CameraStreamerConstructorOptions, initialConstraints?: MediaStreamConstraints): Promise<QrScanner>;
    protected constructor(opts?: CameraStreamerConstructorOptions);
    changeMedia(constraints?: MediaStreamConstraints): Promise<void>;
    getLastCapture(): ImageData | null;
    scanOnce(): Promise<ScanResult[]>;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=../../src/dist/thread-main/qr-scanner.d.ts.map