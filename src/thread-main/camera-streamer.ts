export interface CameraStreamerConstructorOptions {
    /**
     * The HTML `Document` (by default `window.document`). Unless your application opens multiple windows at once you probably won't need this.
     */
    document?: Document | null | undefined;

    /**
     * The `<video>` element to stream the camera to, and by extension read data from.
     * 
     * If no pre-existing `<video>` element is provided, one will be created (and hidden with `display:none`)
     */
    video?: HTMLVideoElement | null | undefined;
}

//const anyUserInput = Promise.withResolvers<void>();
//const auiHandler = () => { anyUserInput.resolve(); document.removeEventListener("click", auiHandler, { capture: true }) };
//document.addEventListener("click", auiHandler, { capture: true, passive: true });

/**
 * Helper class that allows capturing a frame of the camera.
 *
 * Requires you to have an existing <video> and <canvas> element.
 * This will take control of their width/height and add some event handlers.
 *
 */
export class CameraStreamer {

    // This is to detect when the page has shut down to preserve device battery, etc.
    private deviceWakePromise = Promise.withResolvers<void>();

    /**
     * When page unloads, the camera stops, so it becomes pointless to keep running scans on it.
     * 
     * This returns when the page loads again, and thus the camera resumes.
     */
    async waitForPageResume() { return await this.deviceWakePromise.promise; }

    private _context: CanvasRenderingContext2D;

    private _dataLoaded!: PromiseWithResolvers<void>;
    private _loadedDataEventHandler = (e: Event) => {
        const width = (e.target as HTMLVideoElement).videoWidth;
        const height = (e.target as HTMLVideoElement).videoHeight;

        this._videoElement.width = this._canvasElement.width = width;
        this._videoElement.height = this._canvasElement.height = height;
        this._context = this._canvasElement.getContext('2d', { willReadFrequently: true })!;
        this._dataLoaded.resolve();
    };

    private _pauseEventHandler = () => {
        setTimeout(() => {
            this._videoElement.play();
        }, 500)
    };

    private _documentBlurEventHandler = () => {
        // TODO: Reassigning this promise feels...improper.
        // It shouldn't cause problems based on the order in which things happen
        // (and how JS is single-threaded)
        // but I don't like it much.
        this.deviceWakePromise = Promise.withResolvers();
        this._videoElement.pause();
    }

    private _documentFocusEventHandler = () => {
        this.deviceWakePromise.resolve();
        // TODO: Waiting for the data to load is probably unnecessary to resume pausing
        // Probably easiest to test this during the "This page wants to use your camera" dialog.
        this._dataLoaded.promise.then(() => this._videoElement.play());
    }

    private _documentVisibilityChangeHandler = () => {
        if (document.visibilityState == 'hidden') {
            this.deviceWakePromise = Promise.withResolvers();
            this._videoElement.pause();
        }
        else {
            this.deviceWakePromise.resolve();
            this._dataLoaded.promise.then(() => this._videoElement.play());
        }
    }

    private ownsVideoElement = false;
    private ownsCanvasElement = false;
    private _videoElement: HTMLVideoElement;
    private _canvasElement: HTMLCanvasElement;

    private _document: Document;

    constructor({ document, video }: CameraStreamerConstructorOptions) {
        this._document = (document ?? window.document);

        this.deviceWakePromise = Promise.withResolvers();
        if (this._document.visibilityState == 'visible')
            this.deviceWakePromise.resolve();

        // We always own the canvas (if anyone else draws on it it'll ruin our scans, among other reasons)
        this._canvasElement = /*canvas || */((this.ownsCanvasElement = true), this._document.createElement("canvas"));
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

        this._context = this._canvasElement.getContext('2d', { willReadFrequently: true })!;

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

    async changeMedia(constraints: MediaStreamConstraints) {
        this._dataLoaded = Promise.withResolvers();
        //await anyUserInput.promise;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this._videoElement.srcObject = stream;
        await this._dataLoaded.promise;
    }

    private _lastImageData: ImageData | null = null;
    async capture() {
        await this._dataLoaded.promise;
        const { width, height } = this._canvasElement;
        // Draw the video frame to the canvas.
        this._context.drawImage(this._videoElement, 0, 0, width, height);
        this._lastImageData = this._context!.getImageData(0, 0, width, height);
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
