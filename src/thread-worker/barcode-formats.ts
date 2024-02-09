import { getInstanceExports } from "basic-event-wasi";
import { getWasmSync } from "./instance.js";

export type ReadableBarcodeFormats = "Aztec" | "Codabar" | "Code128" | "Code39" | "Code93" | "DataBar" | "DataBarExpanded" | "DataMatrix" | "DXFilmEdge" | "EAN13" | "EAN8" | "ITF" | "LinearCodes" | "MatrixCodes" | "MaxiCode" | "MicroQRCode" | "None" | "PDF417" | "QRCode" | "RMQRCode" | "UPCA" | "UPCE";
export type WritableBarcodeFormats = "Aztec" | "Codabar" | "Code128" | "Code39" | "Code93" | "DataMatrix" | "EAN13" | "EAN8" | "ITF" | "PDF417" | "QRCode" | "UPCA" | "UPCE";
export function convertFormat(input: WritableBarcodeFormats | ReadableBarcodeFormats): number {
    const e = getInstanceExports(getWasmSync()!.instance!);
    switch (input) {
        case "Aztec": return e.formatAztec();
        case "Codabar": return e.formatCodabar();
        case "Code128": return e.formatCode128();
        case "Code39": return e.formatCode39();
        case "Code93": return e.formatCode93();
        case "DataMatrix": return e.formatDataMatrix();
        case "EAN13": return e.formatEAN13();
        case "EAN8": return e.formatEAN8();
        case "ITF": return e.formatITF();
        case "PDF417": return e.formatPDF417();
        case "QRCode": return e.formatQRCode();
        case "UPCA": return e.formatUPCA();
        case "UPCE": return e.formatUPCE();
        case "DataBar": return e.formatDataBar();
        case "DataBarExpanded": return e.formatDataBarExpanded();
        case "DXFilmEdge": return e.formatDXFilmEdge();
        case "LinearCodes": return e.formatLinearCodes();
        case "MatrixCodes": return e.formatMatrixCodes();
        case "MaxiCode": return e.formatMaxiCode();
        case "MicroQRCode": return e.formatMicroQRCode();
        case "None": return e.formatNone();
        case "RMQRCode": return e.formatRMQRCode();
    }
}