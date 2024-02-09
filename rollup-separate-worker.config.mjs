import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import cjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';

/**
 * This is a separate file with its own configuration
 * because the worker is inlined as a string, so it needs
 * to be pre-Babel-ified, pre-minified, and pre-core-js-ified.
 * 
 * These transformations do not apply to the main module itself,
 * which is not transformed. Thus, the separate configuration file.
 */

/** @type {import('rollup').RollupOptions} */
export default {
    input: ["src/thread-worker/index.ts"],
    output: {
        file: "dist/qr-thread.js",
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
        cjs(),
        getBabelOutputPlugin({
            presets: [["@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    corejs: "3.35",
                }]]
        }),
        terser({
            output: {
                semicolons: false
            }
        })
    ],
}
