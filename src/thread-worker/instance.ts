// This file does not import anything.
// It holds space for a WebAssembly instance.
// It only exists on the Worker thread.
// `provideSource`, conversely, is made available to either thread (whichever one holds the binary source)
//
// The intention for this file is to make it easy to switch whether the **source** lives in the Worker or on Main (not the instantiation, just the source).

import { __throw_exception_with_stack_trace, emscripten_notify_memory_growth, environ_get, environ_sizes_get, fd_close, fd_read, fd_seek, fd_write, instantiateStreamingWithWasi, instantiateWithWasi, proc_exit } from "basic-event-wasi";


const imports2 = {
    env: { __throw_exception_with_stack_trace, emscripten_notify_memory_growth },
    wasi_snapshot_preview1: { fd_write, proc_exit, fd_close, fd_read, fd_seek, environ_get, environ_sizes_get }
};

type SourceTypes = string | ArrayBuffer | Response | WebAssembly.Module;

const { promise: sourceAsync, resolve: resolveSource, reject: rejectSource } = Promise.withResolvers<SourceTypes>();
const { promise: wasmAsync, resolve: resolveWasm, reject: rejectWasm } = Promise.withResolvers<WebAssembly.WebAssemblyInstantiatedSource>();

let wasmSync: WebAssembly.WebAssemblyInstantiatedSource | null = null;

function getWasmSync(): WebAssembly.WebAssemblyInstantiatedSource | Partial<WebAssembly.WebAssemblyInstantiatedSource> { return wasmSync || {}; }
async function getWasmAsync() { return (await wasmAsync) || {}; }

/**
 * Provide the Worker thread with the WASM binary source so that it can be instantiated.
 * 
 * If this is on the Main thread, it's async (via Comlink). 
 * If it's on the Worker thread, it's sync (via just calling it. directly.)
 * @param source 
 */
function provideSource(source: SourceTypes) {
    try {
        resolveSource(source);
    }
    catch (ex) {
        rejectSource(ex);
    }
}

export {
    // To get the instantiated binary (on the Worker thread), call these.
    getWasmAsync,
    getWasmSync,

    // Whoever has the source to the WASM binary, be it the main thread or Worker thread
    // should pass it here to `provideSource` (via e.g. Comlink). Doing so will instantiate the binary.
    provideSource
};



// Once this module loads, immediately wait for someone to provide us with the binary source,
// then instantiate it.
(async () => {
    try {
        const obj = await sourceAsync;
        if (typeof obj == "string") {
            const url = new URL(obj, import.meta.url);
            resolveWasm(wasmSync = await instantiateStreamingWithWasi(fetch(url), imports2))
        }
        else if (obj instanceof Response) {
            resolveWasm(wasmSync = await instantiateStreamingWithWasi(obj, imports2))
        }
        else if (obj instanceof ArrayBuffer || obj instanceof WebAssembly.Module) {
            resolveWasm(wasmSync = await instantiateWithWasi(obj, imports2))
        }
        else {
            throw new Error(`provideSource was called on the main thread with something that wasn't a string (as a URL), Response, ArrayBuffer, or WebAssembly.Module. Only those types can be instantiated.`);
        }
    }
    catch (e) {
        rejectWasm(e);
    }
})()