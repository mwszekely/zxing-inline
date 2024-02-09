
import { babel } from "@rollup/plugin-babel";
import cjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

/** @type {import('rollup').RollupOptions} */
export default {
    input: "demo/index.js",
    output: {
        file: "demo/bundle.js",
        format: "es",
        sourcemap: true,
        paths: {
            'comlink': "https://unpkg.com/comlink/dist/esm/comlink.mjs"
        }
    },
    external: ['https://unpkg.com/comlink/dist/esm/comlink.mjs'],
    treeshake: "recommended",
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        resolve(),
        cjs()
    ]
}
