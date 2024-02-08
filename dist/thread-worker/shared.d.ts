export { provideSource } from "./instance.js";
export interface ScanResultCoordinate {
    x: number;
    y: number;
}
export interface ScanResult {
    text: string;
    hash: number;
    data: Uint8Array;
    /**
     * Order is clockwise from top-left:
     * * top-left
     * * top-right
     * * bottom-right
     * * bottom-left
     */
    positions: [ScanResultCoordinate, ScanResultCoordinate, ScanResultCoordinate, ScanResultCoordinate];
    /** Measured in degrees, may be negative */
    orientation: number;
}
export declare function waitUntilReady(): Promise<void>;
//# sourceMappingURL=../../src/dist/thread-worker/shared.d.ts.map