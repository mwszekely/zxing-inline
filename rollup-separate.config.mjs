import cjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import chunkWorkers from "rollup-plugin-chunk-workers";


/** @type {import('rollup').RollupOptions} */
export default {
    input: ["src/index-separated.ts"],
    output: {
        dir: "dist/",
        format: "es",
        sourcemap: true,
        paths: {
            'comlink': "https://unpkg.com/comlink/dist/esm/comlink.mjs"
        }
    },
    external: ["process", 'comlink'],
    treeshake: "recommended",
    plugins: [
        chunkWorkers({ transformPath: _p => 'qr-thread.js' }),      // Inline and build the worker directly from its source code to ours
        url({ include: ['**/*.wasm'], limit: Infinity }),           // Inline the WASM directly
        typescript({  }),                                           // Parse Typescript
        resolve(),                                                  // Handle things like `import "bare-import"`
        cjs()
    ],
}
