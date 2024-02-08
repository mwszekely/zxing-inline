import chunkWorkers from "rollup-plugin-chunk-workers";

/** @type {import('rollup').RollupOptions} */
export default {
    input: "dist/index-separated.js",
    output: {
        file: "dist/index.js",
        format: "es",
        sourcemap: true
    },
    external: ['https://unpkg.com/comlink/dist/esm/comlink.mjs'],
    treeshake: "recommended",
    plugins: [
        chunkWorkers({ mode: "inline" }),
    ],
}
