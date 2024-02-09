import cjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import { } from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';


/** @type {import('rollup').RollupOptions} */
export default {
    input: ["src/index.ts"],
    output: {
        file: "dist/index-separated.js",
        format: "es",
        sourcemap: true,
        paths: {
            'comlink': "https://unpkg.com/comlink/dist/esm/comlink.mjs"
        }
    },
    external: ["process", 'comlink', /@babel\/runtime/],
    treeshake: "recommended",
    plugins: [
        //chunkWorkers({ transformPath: _p => 'qr-thread.js' }),      // Inline and build the worker directly from its source code to ours
        url({ include: ['**/*.wasm'], limit: Infinity }),           // Inline the WASM directly
        typescript({}),                                           // Parse Typescript
        resolve(),                                                  // Handle things like `import "bare-import"`
        cjs()
    ],
}
