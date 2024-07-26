# QR Scanning/Generation from ZXing as a Single-File JS Import

This is a no-frills single-file barcode (including, namely, QR codes) scanner/generator using [the C++ port of ZXing](https://github.com/zxing-cpp/zxing-cpp).

## Features

* Scanning an image runs in a separate `Worker` thread, so the main thread stays responsive.
* ZXing is compiled to WASM from C++, so scanning is faster than with ports of ZXing to Javascript.
* Both the `Worker` and the WASM binary are embedded directly into a single source file, so it can be easily integrated into any build system with no fuss.
* Supports at least (iOS) Safari 14, Firefox, and whatsitsname.
* Extremely simple API:

## API

### Scanning QR Codes/barcodes

Scanning a QR code (or any other kind of barcode) is done by creating a `BarcodeScanner`, then calling `scanOnce`.

**Important**: [The user must interact with the page](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability) in some way before any of these `async` functions will return, as it's not possible (on some devices) to get a video feed of the camera before then.

```typescript
import { BarcodeScanner } from "zxing-inline";

// 1. Create the scanner 
// (it also opens the device's camera and hooks up some events)
using scanner = await BarcodeScanner.create({});

// 2. Scan QR codes, the default
// (multiple can be scanned in a single frame, so an array is returned)
let [...results] = await scanner.scanOnce();

// Or try scanning a different type of barcode
results = await scanner.scanOnce("Aztec");
```

If you want to track a QR code over time (to ensure you don't scan the same one every frame), and display that visually to the user, `BarcodeAnimatingScanner` has an almost identical interface, but provides additional information and can draw to a canvas with a customizable render function.

```typescript
import { BarcodeAnimatingScanner } from "zxing-inline"

// Get a canvas the QrAnimator will draw over.
const c = document.getElementById('overlay-canvas');
// ^^^^ It should be overlaid over the video that draws the camera
// with, like, CSS and stuff. Grids make it pretty easy.

// Create the scanner:
using scanner = await BarcodeAnimatingScanner.create({ canvas: c });
// ^^^^ It also initiates the camera and 
// gets ready to start reading from it,
// and will start drawing to the canvas when appropriate.

while (true) {
    // Actually attempt to scan a QR code in the device's camera view:
    const results = await scanner.scanOnce();
    // ^^^^ An array of results is returned, 
    // as multiple QR codes in the same frame can be scanned.
    
    for (const result of results) {
        // If execution's reached here, then this is the
        // first frame we've seen this QR code.
        //
        // If we don't see it for a few seconds (configurable),
        // but then see it again, it will re-appear here,
        // e.g. assuming the user intentionally wanted to re-scan it
        // but was simply unaware it was a duplicate.
        //  
        // Additionally, this corresponds exactly to what
        // the user sees animated on the canvas, so that
        // a new QR code looks different from an old QR code.
    }
}
```

### Generating QR Codes

`BarcodeEncoder` a basic wrapper around `ZXing`'s `MultiFormatWriter` class, and can encode any kind of supported barcode.

`QrEncoder` is similar, but includes some QR specific features, like central cutouts and more intuitive error-correction values (actually just those two things).

### Encode any kind of barcode

```typescript
import { BarcodeEncoder } from "zxing-inline"

using encoder = new BarcodeEncoder();
const imageBlob = await encoder.encode("String or ArrayBuffer", options);
imageElement.src = URL.createObjectURL(imageBlob);

// Where `options` contains any/none of:
const options = {
    errorCorrection, // A number between [0 - 8], where 8 is the most error correction.
    format           // "QRCode" (default), "Aztec", etc. See `WritableBarcodeFormats`
}

```

### Encode QR codes specifically

```typescript
import { QrEncoder } from "zxing-inline"

using encoder = new QrEncoder();
const imageBlob = await encoder.encode("String or ArrayBuffer", options);
imageElement.src = URL.createObjectURL(imageBlob);

// Where `options` contains any/none of:
const options = {
    errorCorrection, // "1L", "2M", "3Q", or "4H"
    cutoutImages     // An array of (TINY) images to try overlaying in the center
}

```

`cutoutImages` works by overlaying the largest image in the center, and checking to see if it still scans. If it doesn't, the next smallest image is tried, all the way through your array. There are more sophisticated methods out there but they're a bit beyond the scope of a ZXing wrapper library (and even this is stretching it, honestly).



## Build Steps

Run `pnpm run build` to transpile/bundle the Javascript/Typescript code. This is all you need to do if the WASM binary's already built and doesn't need to be updated.

To build the WASM binary from the C++ source code, [see the readme in ./src/wasm](./src/wasm/README.md). Be aware that you'll need Emscripten installed and available on your PATH (i.e. you can open a fresh terminal, type `em++`, and it runs).

## Q: Dependencies?

### C++

* [ZXing-C++](https://github.com/zxing-cpp/zxing-cpp), of course. 
* [FNV](http://www.isthe.com/chongo/tech/comp/fnv/index.html), to generate hashes to track QR codes over time.

### JS

[Comlink](https://github.com/GoogleChromeLabs/comlink) is used by both the main and Worker threads. In the file exported by this library, Comlink is imported from `https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs`.

It isn't a bad idea to use [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to change this to a URL your site owns:

````html
<script type="importmap">
  {
    "imports": {
      "https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs": "https://mysite.com/comlink.mjs"
    }
  }
</script>
````

### Build

* Typescript
* Rollup, and the appropriate plugins:
  * Typescript
  * Node Resolve
  * URL (turn the `.wasm` file into an inlined data URI)
  * Babel (used on the Worker code, as it's transformed into a string that won't be processed further by any build tool)
  * Terser (same as Babel) 
  * Chunk Workers (inlines Worker code)
* core-js and some other Babel stuff for the same reasons as above
* basic-event-wasi (glue code that's smaller than Emscripten's)

