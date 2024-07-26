import resolve from "@rollup/plugin-node-resolve";
import chunkWorkers from "rollup-plugin-chunk-workers";

/**
 * This is the file that inlines the Worker into the main file.
 */

/** @type {import('rollup').RollupOptions} */
export default {
    input: "dist/index-separated.js",
    output: {
        file: "dist/index.js",
        format: "es",
        sourcemap: true
    },
    external: ['https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs'],
    treeshake: "recommended",
    plugins: [
        chunkWorkers({ mode: "inline" }),
        resolve(),
    ],
}
