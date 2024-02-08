import { wrap } from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

const anyUserInput = Promise.withResolvers();
const auiHandler = () => { anyUserInput.resolve(); document.removeEventListener("click", auiHandler, { capture: true }); };
document.addEventListener("click", auiHandler, { capture: true, passive: true });
/**
 * Helper class that allows capturing a frame of the camera.
 *
 * Requires you to have an existing <video> and <canvas> element.
 * This will take control of their width/height and add some event handlers.
 *
 */
class CameraStreamer {
    // This is to detect when the page has shut down to preserve device battery, etc.
    deviceWakePromise = Promise.withResolvers();
    /**
     * When page unloads, the camera stops, so it becomes pointless to keep running scans on it.
     *
     * This returns when the page loads again, and thus the camera resumes.
     */
    async waitForPageResume() { return await this.deviceWakePromise.promise; }
    _context;
    _dataLoaded;
    _loadedDataEventHandler = (e) => {
        const width = e.target.videoWidth;
        const height = e.target.videoHeight;
        this._videoElement.width = this._canvasElement.width = width;
        this._videoElement.height = this._canvasElement.height = height;
        this._context = this._canvasElement.getContext('2d', { willReadFrequently: true });
        this._dataLoaded.resolve();
    };
    _pauseEventHandler = () => {
        setTimeout(() => {
            this._videoElement.play();
        }, 500);
    };
    _documentBlurEventHandler = () => {
        // TODO: Reassigning this promise feels...improper.
        // It shouldn't cause problems based on the order in which things happen
        // (and how JS is single-threaded)
        // but I don't like it much.
        this.deviceWakePromise = Promise.withResolvers();
        this._videoElement.pause();
    };
    _documentFocusEventHandler = () => {
        this.deviceWakePromise.resolve();
        // TODO: Waiting for the data to load is probably unnecessary to resume pausing
        // Probably easiest to test this during the "This page wants to use your camera" dialog.
        this._dataLoaded.promise.then(() => this._videoElement.play());
    };
    _documentVisibilityChangeHandler = () => {
        if (document.visibilityState == 'hidden') {
            this.deviceWakePromise = Promise.withResolvers();
            this._videoElement.pause();
        }
        else {
            this.deviceWakePromise.resolve();
            this._dataLoaded.promise.then(() => this._videoElement.play());
        }
    };
    ownsVideoElement = false;
    ownsCanvasElement = false;
    _videoElement;
    _canvasElement;
    _document;
    constructor({ document, video }) {
        this._document = (document ?? window.document);
        this.deviceWakePromise = Promise.withResolvers();
        if (this._document.visibilityState == 'visible')
            this.deviceWakePromise.resolve();
        // We always own the canvas (if anyone else draws on it it'll ruin our scans, among other reasons)
        this._canvasElement = /*canvas || */ ((this.ownsCanvasElement = true), this._document.createElement("canvas"));
        this._videoElement = video || ((this.ownsVideoElement = true), this._document.createElement("video"));
        this._videoElement.width = this._videoElement.height = this._canvasElement.width = this._canvasElement.height = 1;
        this._videoElement.autoplay = true;
        this._videoElement.controls = false;
        this._videoElement.playsInline = true;
        this._videoElement.muted = true;
        if (this.ownsVideoElement) {
            this._document.body.append(this._videoElement);
            this._videoElement.style.display = "none";
        }
        if (this.ownsCanvasElement) {
            this._document.body.append(this._canvasElement);
            this._canvasElement.style.display = "none";
        }
        this._context = this._canvasElement.getContext('2d', { willReadFrequently: true });
        // Metadata fires for streams, data fires for video, probably???
        // So we probably only need loadedmetadata, but just in case, do both...
        this._videoElement.addEventListener("loadedmetadata", this._loadedDataEventHandler, false);
        this._videoElement.addEventListener("loadeddata", this._loadedDataEventHandler, false);
        // Make sure that we don't keep the camera/video on while the page is in the background
        this._document.addEventListener("blur", this._documentBlurEventHandler);
        this._document.addEventListener("focus", this._documentFocusEventHandler);
        this._document.addEventListener("visibilitychange", this._documentVisibilityChangeHandler);
        this._videoElement.addEventListener("pause", this._pauseEventHandler);
    }
    async changeMedia(constraints) {
        this._dataLoaded = Promise.withResolvers();
        await anyUserInput.promise;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this._videoElement.srcObject = stream;
        await this._dataLoaded.promise;
    }
    _lastImageData = null;
    async capture() {
        await this._dataLoaded.promise;
        const { width, height } = this._canvasElement;
        // Draw the video frame to the canvas.
        this._context.drawImage(this._videoElement, 0, 0, width, height);
        this._lastImageData = this._context.getImageData(0, 0, width, height);
        return this._lastImageData;
    }
    getLastCapture() { return this._lastImageData; }
    [Symbol.dispose]() {
        if (this.ownsCanvasElement) {
            this._canvasElement.remove();
        }
        if (this.ownsVideoElement) {
            this._videoElement.remove();
        }
        else {
            this._videoElement.addEventListener("loadedmetadata", this._loadedDataEventHandler, false);
            this._videoElement.addEventListener("loadeddata", this._loadedDataEventHandler, false);
        }
        this._document.removeEventListener('visibilitychange', this._documentVisibilityChangeHandler);
        this._document.removeEventListener('focus', this._documentFocusEventHandler);
        this._document.removeEventListener('blur', this._documentBlurEventHandler);
    }
}


// This file retrivies the WASM binary and sends it to the worker thread.
// It also wraps the Worker itself via Comlink.
// TODO: Is it better for the Worker itself to have the WASM source directly?
const rawWorker = new Worker(new URL("qr-thread.js", import.meta.url), { type: "module" });
const { scanAll, provideSource, waitUntilReady, encode, ...rest } = wrap(rawWorker);
provideSource(zxingBinary);

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
class QrScanner {
    _streamer;
    static async create(opts = {}, initialConstraints = { video: { facingMode: 'environment' } }) {
        const ret = new this(opts);
        await ret.changeMedia(initialConstraints);
        return ret;
    }
    constructor(opts = {}) {
        this._streamer = new CameraStreamer(opts);
    }
    async changeMedia(constraints = { video: { facingMode: 'environment' } }) { return await this._streamer.changeMedia(constraints); }
    getLastCapture() { return this._streamer.getLastCapture(); }
    async scanOnce() {
        await this._streamer.waitForPageResume();
        await waitUntilReady();
        const data = await this._streamer.capture();
        return await scanAll(data.data, data.width, data.height);
    }
    [Symbol.dispose]() {
        this._streamer[Symbol.dispose]();
    }
}

function defaultRender({ context, color: opacity2, opacity, positions, orientation }) {
    const { width, height } = context.canvas;
    const area = width * height;
    const lineWidthPercent = Math.sqrt(area) / 1000;
    opacity = Math.pow(opacity, 2.5);
    //let colorPart = `${opacity2 * 255},0,${(1 - opacity2) * 255}`;
    const colorWithoutOpacity = `50% 0.3 ${opacity2 * -120 + 20}`;
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
    const origin = { x: (positions[0].x + positions[2].x) / 2, y: (positions[1].y + positions[3].y) / 2 };
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
/**
 * Derivation of QrScanner that tracks a single code over time so it can be drawn with an information overlay, or other operations.
 *
 * Every frame, your `render` function will be called with any recently-scanned QR codes, along with some information about how
 * recently they've been scanned. `defaultRender` provides a sensible default for a `render` function.
 */
class QrAnimatingScanner extends QrScanner {
    _context;
    _render;
    _canvasElement;
    _rafHandle = 0;
    _currentScanResults = new Map();
    constructor({ canvas, render, ...opts }) {
        super(opts);
        this._canvasElement = canvas;
        this._context = this._canvasElement.getContext('2d');
        const rafCb = () => { this.onAnimationFrame(); this._rafHandle = requestAnimationFrame(rafCb); };
        this._rafHandle = requestAnimationFrame(rafCb);
        this._render = render || defaultRender;
    }
    /**
     * Scans the camera for QR codes, returning any found.
     *
     * If any are found, the canvas will animate to reflect the status of their scan.
     */
    async scanOnce() {
        const results = await super.scanOnce();
        if (results.length == 0) {
            this.onScan(null);
            return [];
        }
        else
            return results.map(r => {
                let preexisting = this._currentScanResults.get(r.hash);
                let isNewQrCode = (r != null && preexisting == null);
                if (r) {
                    const imageData = this.getLastCapture();
                    if (this._canvasElement.width != imageData.width || this._canvasElement.height != imageData.height) {
                        this._canvasElement.width = imageData.width;
                        this._canvasElement.height = imageData.height;
                        this._context = this._canvasElement.getContext('2d');
                    }
                    this._currentScanResults.set(r.hash, ({ ...r, fadeStartTime: null, firstScanned: (preexisting?.firstScanned || +new Date()), fadePhase: 'just-scanned', freshness: (isNewQrCode) ? 'new' : 'fading' }));
                }
                for (const [hash, r] of this._currentScanResults) {
                    if (r.fadePhase == 'just-drawn') {
                        r.fadePhase = 'missing';
                        r.fadeStartTime = +(new Date());
                    }
                }
                const ret = this._currentScanResults.get(r.hash);
                this.onScan(ret);
                return ret;
            });
    }
    onScan(r) {
        let isNewQrCode = (r != null && this._currentScanResults.get(r.hash) == null);
        if (r) {
            const imageData = this.getLastCapture();
            if (this._canvasElement.width != imageData.width || this._canvasElement.height != imageData.height) {
                this._canvasElement.width = imageData.width;
                this._canvasElement.height = imageData.height;
                this._context = this._canvasElement.getContext('2d');
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
    onAnimationFrame() {
        this._context.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
        this._context.lineWidth = 4;
        let hashesToDelete = new Set();
        const FADE_DURATION_OPACITY = 1.5;
        const FADE_DURATION_COLOR = 3;
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

const t = new TextEncoder();
class QrEncoder {
    _canvas;
    _context;
    constructor({ document } = {}) {
        document ??= window.document;
        this._canvas = document.createElement("canvas");
        this._canvas.style.display = 'none';
        document.body.appendChild(this._canvas);
        this._context = this._canvas.getContext('2d', { willReadFrequently: true });
    }
    async encode(inputData, { errorCorrection, cutoutImages } = {}) {
        await waitUntilReady();
        errorCorrection ||= (cutoutImages ? 8 : 4);
        const parsedData = new Uint8ClampedArray(typeof inputData == 'string' ? t.encode(inputData) : inputData);
        let { data, width, height } = await encode(parsedData, typeof inputData == 'string' ? 'utf8' : 'binary', errorCorrection);
        const bmp = await createImageBitmap(new ImageData(new Uint8ClampedArray(data), width, height), {});
        this._canvas.width = width;
        this._canvas.height = height;
        this._context = this._canvas.getContext('2d', { willReadFrequently: true });
        this._context.canvas;
        this._context.save();
        this._context.imageSmoothingEnabled = false;
        this._context.imageSmoothingQuality = 'low'; // TODO: Unnecessary?
        this._context.drawImage(bmp, 0, 0, width, height, 0, 0, width, height);
        const sortedByArea = !cutoutImages ? [] : Array.isArray(cutoutImages) ? [...cutoutImages].sort((lhs, rhs) => { return (rhs.height * rhs.width) - (lhs.height * lhs.width); }) : [cutoutImages];
        let foundAnyCutout = false;
        const qrImageDataBeforeCutoutBg = await createImageBitmap(this._context.getImageData(0, 0, width, height, { colorSpace: 'srgb' }));
        if (cutoutImages) {
            for (let c of sortedByArea) {
                this._context.clearRect(0, 0, width, height);
                this._context.drawImage(qrImageDataBeforeCutoutBg, 0, 0);
                const left = Math.floor((width / 2) - (c.width / 2));
                const top = Math.floor((height / 2) - (c.height / 2));
                this._context.drawImage(c, 0, 0, c.width, c.height, left, top, c.width, c.height);
                const results = await scanAll(this._context.getImageData(0, 0, width, height).data, width, height);
                if (results.length) {
                    foundAnyCutout = true;
                    break;
                }
            }
        }
        if (!foundAnyCutout) {
            this._context.drawImage(qrImageDataBeforeCutoutBg, 0, 0);
        }
        const b = await new Promise(resolve => this._canvas.toBlob(resolve, "image/png"));
        this._context.restore();
        return b;
    }
    [Symbol.dispose]() {
        this._canvas.remove();
    }
}

export { QrAnimatingScanner, QrEncoder, QrScanner };
//# sourceMappingURL=index-separated.js.map