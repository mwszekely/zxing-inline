
// Rollup's URL plugin is configured to import .wasm
// files as a string representing a URL.
declare module '*.wasm' {
    declare const result: string;
    export default result;
}
