
type Pointer<T> = import('basic-event-wasi').Pointer<T>;

declare module 'basic-event-wasi' {
    export interface KnownInstanceExports {
        scan(data: Pointer<number>, width: number, height: number, format: number, hardInsteadOfFast: boolean): number;
        generate(data: Pointer<number>, length: number, characterSet: number, format: number, ecc: number): void;
        getGeneratedImageData(): Pointer<number>;
        getGeneratedImageLength(): number;
        getGeneratedImageWidth(): number;
        getGeneratedImageHeight(): number;
        positionOfCurrentResultX(which: 0 | 1 | 2 | 3): number;
        positionOfCurrentResultY(which: 0 | 1 | 2 | 3): number;
        currentResultOrientation(): number;
        currentResultTextLength(): number;
        readCurrentResultText(): Pointer<number>;
        currentResultDataLength(): number;
        readCurrentResultData(): Pointer<number>;
        currentResultOrientation(): number;
        currentResultHash(): number;
        nextResult(): void;


        formatAztec(): number;
        formatCodabar(): number;
        formatCode128(): number;
        formatCode39(): number;
        formatCode93(): number;
        formatDataBar(): number;
        formatDataBarExpanded(): number;
        formatDataMatrix(): number;
        formatDXFilmEdge(): number;
        formatEAN13(): number;
        formatEAN8(): number;
        formatITF(): number;
        formatLinearCodes(): number;
        formatMatrixCodes(): number;
        formatMaxiCode(): number;
        formatMicroQRCode(): number;
        formatNone(): number;
        formatPDF417(): number;
        formatQRCode(): number;
        formatRMQRCode(): number;
        formatUPCA(): number;
        formatUPCE(): number;

        characterSetUnknown(): number;
        characterSetASCII(): number;
        characterSetISO8859_1(): number;
        characterSetISO8859_2(): number;
        characterSetISO8859_3(): number;
        characterSetISO8859_4(): number;
        characterSetISO8859_5(): number;
        characterSetISO8859_6(): number;
        characterSetISO8859_7(): number;
        characterSetISO8859_8(): number;
        characterSetISO8859_9(): number;
        characterSetISO8859_10(): number;
        characterSetISO8859_11(): number;
        characterSetISO8859_13(): number;
        characterSetISO8859_14(): number;
        characterSetISO8859_15(): number;
        characterSetISO8859_16(): number;
        characterSetCp437(): number;
        characterSetCp1250(): number;
        characterSetCp1251(): number;
        characterSetCp1252(): number;
        characterSetCp1256(): number;
        characterSetShift_JIS(): number;
        characterSetBig5(): number;
        characterSetGB2312(): number;
        characterSetGB18030(): number;
        characterSetEUC_JP(): number;
        characterSetEUC_KR(): number;
        characterSetUTF16BE(): number;
        characterSetUTF8(): number;
        characterSetUTF16LE(): number;
        characterSetUTF32BE(): number;
        characterSetUTF32LE(): number;
        characterSetBINARY(): number;
    }
}

