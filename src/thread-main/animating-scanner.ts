import { ReadableBarcodeFormats } from "../thread-worker/barcode-formats.js";
import type { ScanResult } from "../thread-worker/shared.js";
import { BarcodeScanner, BarcodeScannerConstructorOptions } from "./scanner.js";


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
type Freshness = 'new' | 'fading' | 'forgotten'

export function defaultRender({ context, color: opacity2, opacity, positions, orientation }: RenderInfo) {

    const { width, height } = context.canvas;
    const area = width * height;
    const lineWidthPercent = Math.sqrt(area) / 1000;

    opacity = Math.pow(opacity, 2.5);
    //let colorPart = `${opacity2 * 255},0,${(1 - opacity2) * 255}`;
    const colorWithoutOpacity = `50% 0.3 ${opacity2 * -120 + 20}`;
    const colorWithOpacity = `50% 0.3 ${opacity2 * -120 + 20}`;
    const strokeColor = `oklch(${colorWithoutOpacity} ${Math.max(0, opacity)})`;
    context.fillStyle = `oklch(${colorWithoutOpacity} ${opacity * ((1 - opacity2) / 2)})`;
    context.strokeStyle = strokeColor;

    // This is the base width of each line/circle (before scaling to the size of the canvas)
    // Separated out to make the math work right between lineWidth and arcRadius (if it were arcDiameter we'd be fine...)
    const BASE_WIDTH = 10;

    // Draw a thicker white outline, then an inner, red/blue outline.
    const styles2 = [{ style: `rgba(255,255,255, ${Math.max(0, opacity)})`, width: 5 }, { style: strokeColor, width: 0 }];

    let i = -1;
    for (const s of styles2) {
        ++i;
        context.strokeStyle = s.style;
        context.lineWidth = (BASE_WIDTH + s.width) * lineWidthPercent;

        // Draw the rectangle outline/fill
        context.beginPath();
        for (let i = 0; i < 5; ++i) {
            let i2 = i % 4;
            context[i ? "lineTo" : "moveTo"](positions[i2].x, positions[i2].y);
        }
        if (i == 0)
            context.fill();

        context.fillStyle = `rgba(0,0,0,${opacity * ((1 - opacity2) / 2)})`;
        context.stroke();



        // Draw the four corner circles
        context.fillStyle = s.style;
        for (let i = 0; i < 4; ++i) {
            context.beginPath();
            context.arc(positions[i].x, positions[i].y, lineWidthPercent * ((2 * BASE_WIDTH) + (s.width / 2)), 0, 2 * Math.PI);
            context.fill();
        }
    }

    // Draw the crosshair
    context.save();
    const origin = { x: (positions[0].x + positions[2].x) / 2, y: (positions[1].y + positions[3].y) / 2 }
    context.translate(origin.x, origin.y);
    context.rotate(orientation / 180 * Math.PI);
    context.lineCap = 'round';

    for (const s of styles2) {

        context.strokeStyle = s.style;
        context.lineWidth = (BASE_WIDTH + s.width) * lineWidthPercent;

        const L = 25;

        context.beginPath();
        context.moveTo(0, lineWidthPercent * -L);
        context.lineTo(0, lineWidthPercent * L);
        context.stroke();

        context.beginPath();
        context.moveTo(lineWidthPercent * -L, 0);
        context.lineTo(lineWidthPercent * L, 0);
        context.stroke();
    }
    context.restore();



}


export interface AnimatedScanResult extends ScanResult {
    firstScanned: number;
    fadeStartTime: number | null;
    fadePhase: FadePhase;
    freshness: Freshness;
}

export interface BarcodeAnimatingScannerConstructorOptions extends BarcodeScannerConstructorOptions {
    /**
     * The canvas that will be drawn to. Should be overlaid over the
     * video that the camera is streaming to.
     */
    canvas: HTMLCanvasElement;

    /**
     * In milliseconds, how long it takes to "forget" a QR code
     * and allow it to be scanned again (default: 3000).
     * 
     * This can be set to `Infinity`, but might be frustrating for
     * users in the uncommon case where this is desirable behavior.
     */
    rescanTimeout?: number;

    /**
     * If provided, this function will be used to draw to the canvas instead of our own.
     */
    render?: (info: RenderInfo) => void;
}

/**
 * Derivation of QrScanner that tracks a single code over time so it can be drawn with an information overlay, or other operations.
 * 
 * Every frame, your `render` function will be called with any recently-scanned QR codes, along with some information about how
 * recently they've been scanned. `defaultRender` provides a sensible default for a `render` function.
 */
export class BarcodeAnimatingScanner extends BarcodeScanner {
    private _context: CanvasRenderingContext2D;
    private _render: (info: RenderInfo) => void;
    private _canvasElement: HTMLCanvasElement;
    private _rafHandle = 0;
    private _currentScanResults = new Map<number, AnimatedScanResult>();

    constructor({ canvas, render, ...opts }: Omit<BarcodeAnimatingScannerConstructorOptions, "constraints">) {
        super(opts);
        this._canvasElement = canvas;
        this._context = this._canvasElement.getContext('2d')!;

        const rafCb = () => { this.onAnimationFrame(); this._rafHandle = requestAnimationFrame(rafCb) };
        this._rafHandle = requestAnimationFrame(rafCb);

        this._render = render || defaultRender;
    }


    /**
     * Scans the camera for QR codes, returning any found.
     * 
     * If any are found, the canvas will animate to reflect the status of their scan.
     */
    override async scanOnce(format: ReadableBarcodeFormats = "QRCode") {
        const results = await super.scanOnce(format);
        if (results.length == 0) {
            this.onScan(null);
            return [];
        }
        else
            return results.map(r => {
                let preexisting = this._currentScanResults.get(r.hash);
                let isNewQrCode = (r != null && preexisting == null);

                if (r) {
                    const imageData = this.getLastCapture()!;
                    if (this._canvasElement.width != imageData.width || this._canvasElement.height != imageData.height) {
                        this._canvasElement.width = imageData.width;
                        this._canvasElement.height = imageData.height;
                        this._context = this._canvasElement.getContext('2d')!;
                    }
                    this._currentScanResults.set(r.hash, ({ ...r, fadeStartTime: null, firstScanned: (preexisting?.firstScanned || +new Date()), fadePhase: 'just-scanned', freshness: (isNewQrCode) ? 'new' : 'fading' }));

                }


                for (const [hash, r] of this._currentScanResults) {
                    if (r.fadePhase == 'just-drawn') {
                        r.fadePhase = 'missing';
                        r.fadeStartTime = +(new Date());
                    }
                }

                const ret = this._currentScanResults.get(r.hash)!;

                this.onScan(ret);

                return ret;
            }).filter(a => a.freshness == 'new');
    }


    private onScan(r: AnimatedScanResult | null): boolean {
        let isNewQrCode = (r != null && this._currentScanResults.get(r.hash) == null);

        if (r) {
            const imageData = this.getLastCapture()!;
            if (this._canvasElement.width != imageData.width || this._canvasElement.height != imageData.height) {
                this._canvasElement.width = imageData.width;
                this._canvasElement.height = imageData.height;
                this._context = this._canvasElement.getContext('2d')!;
            }
            this._currentScanResults.set(r.hash, ({ ...r, fadeStartTime: null, fadePhase: 'just-scanned', freshness: (isNewQrCode) ? 'new' : 'fading' }));

        }

        for (const [hash, r] of this._currentScanResults) {
            if (r.fadePhase == 'just-drawn') {
                r.fadePhase = 'missing';
                r.fadeStartTime = +(new Date());
            }
        }

        return isNewQrCode;
    }

    private _rescanTimeout: number = 3;

    get rescanTimeout() { return this._rescanTimeout }
    set rescanTimeout(milliseconds: number) { this._rescanTimeout = milliseconds / 1000; }


    private onAnimationFrame() {
        this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        this._context.lineWidth = 4;

        let hashesToDelete = new Set<number>();

        const FADE_DURATION_OPACITY = 1.5;
        const FADE_DURATION_COLOR = this._rescanTimeout;


        for (const [hash, currentResult] of this._currentScanResults) {

            const currentDurationHidden = ((+new Date()) - (currentResult.fadeStartTime ?? (+new Date()))) / 1000;
            const currentDurationShown = ((+new Date()) - currentResult.firstScanned) / 1000;

            // Turn currentDurationHidden into a value between [0, 1], starting at 1 (and unclamped, so it might be out of bounds ATM).
            let opacity = currentResult.fadePhase != 'missing' ? 1 : (FADE_DURATION_OPACITY - currentDurationHidden) * (1 / FADE_DURATION_OPACITY);
            let opacity2 = (FADE_DURATION_COLOR - currentDurationShown) * (1 / FADE_DURATION_COLOR);

            // Add some easing to the animation, so it's not linear.
            // opacity = Math.pow(opacity, 5);
            // opacity2 = Math.pow(opacity2, 5); 

            // *Now* clamp it.
            opacity = Math.min(1, Math.max(0, opacity));
            opacity2 = Math.min(1, Math.max(0, opacity2));


            if (opacity <= 0) {
                hashesToDelete.add(hash);
                currentResult.freshness = 'forgotten';
            }

            this._render({ context: this._context, color: opacity2, opacity, ...currentResult });

            if (currentResult.fadePhase == 'just-scanned') {
                currentResult.fadePhase = 'just-drawn';
            }
        }


        for (const h of hashesToDelete)
            this._currentScanResults.delete(h);
    }


    [Symbol.dispose]() {
        cancelAnimationFrame(this._rafHandle);
    }
}
