# QR Scanning/Generation from ZXing as a Single-File JS Import

This is a no-frills single-file QR code scanner/generator using [the C++ port of ZXing](https://github.com/zxing-cpp/zxing-cpp).

(It can also scan/create non-QR codes if requested as well &mdash; anything ZXing-C++ supports).

## Features

* Scanning an image runs in a separate `Worker` thread, so the main thread stays responsive.
* ZXing is compiled to WASM from C++, so scanning is faster than with ports of ZXing to Javascript.
* Both the `Worker` and the WASM binary are embedded directly into a single source file.
* Supports at least iOS Safari 14, Firefox, and whatsitsname.
* Extremely simple API:

## API

### Scanning QR Codes

Scanning a QR code is done by creating a `QrScanner`, then calling `scanOnce`.

**Important**: [The user must interact with the page](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability) in some way before any of these `async` functions will return, as it's not possible (on some devices) to get a video feed of the camera before then.

```typescript
import { QrScanner } from "scanner";

// 1. Create the scanner (it also opens the device's camera and hooks up some events)
using scanner = await QrScanner.create();

// 2. Scan QR codes (can scan multiple in a single frame, so an array is returned)
const [...results] = await scanner.scanOnce();
```

If you want to track a QR code over time (to ensure you don't scan the same one every frame), and display that visually to the user, `QrAnimatingScanner` has an almost identical interface, but provides additional information and can draw to a canvas with a customizable render function.

```typescript
import { QrAnimatingScanner } from "scanner"

// This is the canvas the QrAnimator will draw over.
// It's separate from the scanner's canvas, 
// which is just used for meta video-blitting purposes,
// as this one's cleared every animation frame.
// It should be overlaid over the video that draws the camera.
const c = document.getElementById('overlay-canvas');

using scanner = await QrAnimatingScanner.create({ canvas: c });

while (true) {
    const results = await scanner.scanOnce();
    // ^^^^^^^^^^^^^^^^^^^^^^
    // The canvas will be animated continuously,
    // but timers will only run in relation to how
    // long it takes for `scanOnce` to complete, 
    // intended especially for slower devices.
    
    for (const result of results) {
        if (result.freshness == 'new') {
            // This is the first time this QR code has been seen
            // (at least, for a specified timeout period)
            // so this is where you'd put the code that acts 
            // on its contents (so that work isn't duplicated)
        }
    }
}
```

## Generating QR Codes

```typescript
import { QrEncoder } from "scanner"

using encoder = new QrEncoder();
const imageData = encoder.encode("String or ArrayBuffer", options);

// Where `options` contains any/none of:
const options = {
    errorCorrection, // 0 (minimal/no error correction) to 8 (maximum error correction)
    cutoutImages     // An array of (SMALL) images to try overlaying in the center
}

```


## Build Steps

Run `pnpm run build` to transpile/bundle the Javascript/Typescript code. This is all you need to do if the WASM binary's already built and doesn't need to be updated.

To build the WASM binary from the C++ source code, [see the readme in ./src/wasm](./src/wasm/README.md). Be aware that you'll need Emscripten installed and available on your PATH (i.e. you can open a fresh terminal, type `em++`, and it runs).

## Q: Dependencies?
[ZXing-C++](https://github.com/zxing-cpp/zxing-cpp), of course. Also, to track QR codes over time we hash them using [FNV](http://www.isthe.com/chongo/tech/comp/fnv/index.html).
