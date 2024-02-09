import type { ScanResult } from "../thread-worker/shared.js";
import { CameraStreamerConstructorOptions } from "./camera-streamer.js";
import { BarcodeScanner } from "./qr-scanner.js";
export interface RenderInfo extends ScanResult {
    /**
     * Based on how long since we last saw this QR code, how faded should the graphic look? [0-1]
     *
     * It's recommended to add some scaling to this linear-as-log value, e.g. `opacity = Math.pow(opacity, 5)`
     */
    opacity: number;
    /**
     * Like `opacity`, but for the "staleness" of the current QR code -- how long it's been in the current viewport with no change (also [0-1], like `opacity`)
     */
    color: number;
    /**
     * The canvas's context that you can draw things to. It's already been cleared by this point.
     */
    context: CanvasRenderingContext2D;
    /**
     * * `new`: This is the first frame this QR code has been drawn.
     * * `fading`: This is a frame where the QR code is still being drawn from a past scan, though it has not expired yet.
     * * `forgotten`: This is the last frame this QR code will be drawn (if it is scanned again the very next frame, it will be `new` again).
     */
    freshness: Freshness;
}
type FadePhase = 'just-scanned' | 'just-drawn' | 'missing';
type Freshness = 'new' | 'fading' | 'forgotten';
export declare function defaultRender({ context, color: opacity2, opacity, positions, orientation }: RenderInfo): void;
export type QrAnimatingScannerOptions = CameraStreamerConstructorOptions & {
    /**
     * The canvas that will be drawn to. Should be overlaid over the
     * video that the camera is streaming to.
     */
    canvas: HTMLCanvasElement;
    /**
     * In milliseconds, how long it takes to "forget" a QR code
     * and allow it to be scanned again.
     *
     * This can be set to `Infinity`, but might be frustrating for
     * users in the uncommon case where this is desirable behavior.
     */
    rescanTimeout?: number;
    /**
     * If provided, this function will be used to draw to the canvas instead of our own.
     */
    render?: (info: RenderInfo) => void;
};
export interface AnimatedScanResult extends ScanResult {
    firstScanned: number;
    fadeStartTime: number | null;
    fadePhase: FadePhase;
    freshness: Freshness;
}
/**
 * Derivation of QrScanner that tracks a single code over time so it can be drawn with an information overlay, or other operations.
 *
 * Every frame, your `render` function will be called with any recently-scanned QR codes, along with some information about how
 * recently they've been scanned. `defaultRender` provides a sensible default for a `render` function.
 */
export declare class BarcodeAnimatingScanner extends BarcodeScanner {
    private _context;
    private _render;
    private _canvasElement;
    private _rafHandle;
    private _currentScanResults;
    protected constructor({ canvas, render, ...opts }: QrAnimatingScannerOptions);
    /**
     * Scans the camera for QR codes, returning any found.
     *
     * If any are found, the canvas will animate to reflect the status of their scan.
     */
    scanOnce(): Promise<AnimatedScanResult[]>;
    private onScan;
    private _rescanTimeout;
    get rescanTimeout(): number;
    set rescanTimeout(milliseconds: number);
    private onAnimationFrame;
    [Symbol.dispose](): void;
}
export {};
//# sourceMappingURL=qr-animator.d.ts.map