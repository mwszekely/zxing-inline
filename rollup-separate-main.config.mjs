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
            'comlink': "https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs"
        }
    },
    external: ["process", 'comlink', /@babel\/runtime/],
    treeshake: "recommended",
    plugins: [
        url({ include: ['**/*.wasm'], limit: Infinity }),         // Inline the WASM directly
        typescript({}),                                           // Parse Typescript
        resolve()                                                 // Handle things like `import "bare-import"`
    ],
}
