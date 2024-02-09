import type * as WorkerExports from "../thread-worker/index.js";
declare const scanAll: import("comlink").Remote<typeof WorkerExports.scanAll>, waitUntilReady: import("comlink").Remote<typeof WorkerExports.waitUntilReady>, encode: import("comlink").Remote<typeof WorkerExports.encode>;
export { encode, scanAll, waitUntilReady };
//# sourceMappingURL=thread-interop.d.ts.map