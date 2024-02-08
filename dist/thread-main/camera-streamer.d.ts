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
/**
 * Helper class that allows capturing a frame of the camera.
 *
 * Requires you to have an existing <video> and <canvas> element.
 * This will take control of their width/height and add some event handlers.
 *
 */
export declare class CameraStreamer {
    private deviceWakePromise;
    /**
     * When page unloads, the camera stops, so it becomes pointless to keep running scans on it.
     *
     * This returns when the page loads again, and thus the camera resumes.
     */
    waitForPageResume(): Promise<void>;
    private _context;
    private _dataLoaded;
    private _loadedDataEventHandler;
    private _pauseEventHandler;
    private _documentBlurEventHandler;
    private _documentFocusEventHandler;
    private _documentVisibilityChangeHandler;
    private ownsVideoElement;
    private ownsCanvasElement;
    private _videoElement;
    private _canvasElement;
    private _document;
    constructor({ document, video }: CameraStreamerConstructorOptions);
    changeMedia(constraints: MediaStreamConstraints): Promise<void>;
    private _lastImageData;
    capture(): Promise<ImageData>;
    getLastCapture(): ImageData | null;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=../../src/dist/thread-main/camera-streamer.d.ts.map