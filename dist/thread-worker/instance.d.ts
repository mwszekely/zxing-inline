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