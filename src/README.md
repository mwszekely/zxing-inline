The structure of this directory is as follows:

* `./wasm` contains the C++ source code and compiled WASM binary files. No JS/TS code.
* `./thread-worker` contains the Worker-only code that, upon instantiating a WASM binary, processes commands to scan/encode QR codes.
* `./thread-main` is what you import/call from the main event thread. It can asynchronously scan/encode QR codes by communicating with the Worker thread. It also imports the WASM binary itself into a Data URI.

When Rollup bundles this library, `./thread-main` is used as the entry point, within which a `Worker` is created whose URL points to `./thread-worker`.