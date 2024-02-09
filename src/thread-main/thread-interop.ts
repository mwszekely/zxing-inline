
import { createEndpoint, releaseProxy, wrap } from "comlink";
import type * as WorkerExports from "../thread-worker/index.js"; // Doesn't actually import any code, just its types
import zxingBinary from "../wasm/qr.wasm";



// This file retrivies the WASM binary and sends it to the worker thread.
// It also wraps the Worker itself via Comlink.
// TODO: Is it better for the Worker itself to have the WASM source directly?
//const rawWorker = new Worker(new URL("../thread-worker/index.js", import.meta.url), { type: "module" });
const rawWorker = new Worker(new URL("./qr-thread.js", import.meta.url), { type: "module" });
const { scanAll, provideSource, waitUntilReady, encode, ...rest } = wrap<typeof WorkerExports>(rawWorker);
provideSource(zxingBinary);

export { encode, scanAll, waitUntilReady };






if (0) {
    /**
     * This ugly bit is just compile-time error checking.
     * It makes sure we imported everything from Comlink properly.
     */
    const { [createEndpoint]: _unused1, [releaseProxy]: _unused2, ...rest2 } = rest;
    (function assertEmptyObject<T extends {} | void>(_a: [Exclude<keyof T, "_e">] extends [never] ? T : [T] extends [void] ? void : `Unhandled keys in this rest spread object!`): void { })
        (rest2);
}
