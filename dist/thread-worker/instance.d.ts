import { __throw_exception_with_stack_trace, emscripten_notify_memory_growth, environ_get, environ_sizes_get, fd_close, fd_read, fd_seek, fd_write, proc_exit } from "basic-event-wasi";
export declare const imports2: {
    env: {
        __throw_exception_with_stack_trace: typeof __throw_exception_with_stack_trace;
        emscripten_notify_memory_growth: typeof emscripten_notify_memory_growth;
    };
    wasi_snapshot_preview1: {
        fd_write: typeof fd_write;
        proc_exit: typeof proc_exit;
        fd_close: typeof fd_close;
        fd_read: typeof fd_read;
        fd_seek: typeof fd_seek;
        environ_get: typeof environ_get;
        environ_sizes_get: typeof environ_sizes_get;
    };
};
type SourceTypes = string | ArrayBuffer | Response | WebAssembly.Module;
declare function getWasmSync(): WebAssembly.WebAssemblyInstantiatedSource | Partial<WebAssembly.WebAssemblyInstantiatedSource>;
declare function getWasmAsync(): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
/**
 * Provide the Worker thread with the WASM binary source so that it can be instantiated.
 *
 * If this is on the Main thread, it's async (via Comlink).
 * If it's on the Worker thread, it's sync (via just calling it. directly.)
 * @param source
 */
declare function provideSource(source: SourceTypes): void;
export { getWasmAsync, getWasmSync, provideSource };
//# sourceMappingURL=instance.d.ts.map