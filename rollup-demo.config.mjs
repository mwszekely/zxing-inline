
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

/** @type {import('rollup').RollupOptions} */
export default {
    input: "demo/index.js",
    output: {
        file: "demo/bundle.js",
        format: "es",
        sourcemap: true,
        paths: {
            'comlink': "https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs"
        }
    },
    external: ['comlink', 'https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs'],
    treeshake: "recommended",
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        resolve()
    ]
}
