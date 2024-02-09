This directory contains the C++ source code that gets compiled to WASM, and the compiled WASM binary itself.

It is separated out into its own directory because it could live on either thread, theoretically. We choose to have the source live on the main thread and be instantiated on the Worker thread somewhat arbitrarily. Conversely, the code itself will always execute on the Worker thread, no matter where the source lives. 

It may be useful to have multiple Workers instantiated from the same source, for example, but this is not currently implemented (or planned, tbh).

## To Build

Run the following command (given in Powershell, replace the backticks as appropriate for more sensible shells). 

These assumptions are made:

1. You're compiling from the project root, not here (i.e. `cd ../..` if necessary)
1. Emscripten is on your PATH. If it's not, you can quickly do this by going to your `emsdk` directory, opening a new terminal, and running `emsdk_env`, then coming back to the root project directory and running this command.
1. `emsdk`, with its `#include`-able header files, can be found in the parent folder (on second line, `-I"../emsdk/upstream/<...>`). Adjust if not.

```powershell
em++ `
-I"../emsdk/upstream/emscripten/cache/sysroot/include" `
-I"./src/wasm/zxing-cpp/core/src" `
-I"./src/wasm/fnv" `
-O3 `
-std=c++20 `
-sALLOW_MEMORY_GROWTH `
-sEXPORTED_FUNCTIONS="['_malloc', '_realloc', '_free']" `
--no-entry `
-o ./src/wasm/qr.wasm `
./src/wasm/qr.cpp `
./src/wasm/fnv/hash_32a.c `
./src/wasm/zxing-cpp/core/src/BarcodeFormat.cpp `
./src/wasm/zxing-cpp/core/src/BinaryBitmap.cpp `
./src/wasm/zxing-cpp/core/src/BitArray.cpp `
./src/wasm/zxing-cpp/core/src/BitMatrix.cpp `
./src/wasm/zxing-cpp/core/src/BitMatrixIO.cpp `
./src/wasm/zxing-cpp/core/src/BitSource.cpp `
./src/wasm/zxing-cpp/core/src/CharacterSet.cpp `
./src/wasm/zxing-cpp/core/src/ConcentricFinder.cpp `
./src/wasm/zxing-cpp/core/src/Content.cpp `
./src/wasm/zxing-cpp/core/src/DecodeHints.cpp `
./src/wasm/zxing-cpp/core/src/ECI.cpp `
./src/wasm/zxing-cpp/core/src/GenericGF.cpp `
./src/wasm/zxing-cpp/core/src/GenericGFPoly.cpp `
./src/wasm/zxing-cpp/core/src/GlobalHistogramBinarizer.cpp `
./src/wasm/zxing-cpp/core/src/GridSampler.cpp `
./src/wasm/zxing-cpp/core/src/GTIN.cpp `
./src/wasm/zxing-cpp/core/src/HRI.cpp `
./src/wasm/zxing-cpp/core/src/HybridBinarizer.cpp `
./src/wasm/zxing-cpp/core/src/MultiFormatReader.cpp `
./src/wasm/zxing-cpp/core/src/MultiFormatWriter.cpp `
./src/wasm/zxing-cpp/core/src/PerspectiveTransform.cpp `
./src/wasm/zxing-cpp/core/src/ReadBarcode.cpp `
./src/wasm/zxing-cpp/core/src/ReedSolomonDecoder.cpp `
./src/wasm/zxing-cpp/core/src/ReedSolomonEncoder.cpp `
./src/wasm/zxing-cpp/core/src/Result.cpp `
./src/wasm/zxing-cpp/core/src/ResultPoint.cpp `
./src/wasm/zxing-cpp/core/src/TextDecoder.cpp `
./src/wasm/zxing-cpp/core/src/TextEncoder.cpp `
./src/wasm/zxing-cpp/core/src/TextUtfEncoding.cpp `
./src/wasm/zxing-cpp/core/src/Utf.cpp `
./src/wasm/zxing-cpp/core/src/WhiteRectDetector.cpp `
./src/wasm/zxing-cpp/core/src/ZXBigInteger.cpp `
./src/wasm/zxing-cpp/core/src/zxing-c.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZDecoder.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZDetector.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZEncoder.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZHighLevelEncoder.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZReader.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZToken.cpp `
./src/wasm/zxing-cpp/core/src/aztec/AZWriter.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMBitLayout.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMDataBlock.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMDecoder.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMDetector.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMECEncoder.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMHighLevelEncoder.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMReader.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMSymbolInfo.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMVersion.cpp `
./src/wasm/zxing-cpp/core/src/datamatrix/DMWriter.cpp `
./src/wasm/zxing-cpp/core/src/maxicode/MCBitMatrixParser.cpp `
./src/wasm/zxing-cpp/core/src/maxicode/MCDecoder.cpp `
./src/wasm/zxing-cpp/core/src/maxicode/MCReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCodabarReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCodabarWriter.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode128Patterns.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode128Reader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode128Writer.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode39Reader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode39Writer.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode93Reader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODCode93Writer.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODDataBarCommon.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODDataBarExpandedBitDecoder.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODDataBarExpandedReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODDataBarReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODDXFilmEdgeReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODEAN13Writer.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODEAN8Writer.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODITFReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODITFWriter.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODMultiUPCEANReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODReader.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODUPCAWriter.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODUPCEANCommon.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODUPCEWriter.cpp `
./src/wasm/zxing-cpp/core/src/oned/ODWriterHelper.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFBarcodeValue.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFBoundingBox.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFCodewordDecoder.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFDecoder.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFDetectionResult.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFDetectionResultColumn.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFDetector.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFEncoder.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFHighLevelEncoder.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFModulusGF.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFModulusPoly.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFReader.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFScanningDecoder.cpp `
./src/wasm/zxing-cpp/core/src/pdf417/PDFWriter.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRBitMatrixParser.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRCodecMode.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRDataBlock.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRDecoder.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRDetector.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QREncoder.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRErrorCorrectionLevel.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRFormatInformation.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRMaskUtil.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRMatrixUtil.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRReader.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRVersion.cpp `
./src/wasm/zxing-cpp/core/src/qrcode/QRWriter.cpp `
./src/wasm/zxing-cpp/core/src/libzueci/zueci.c
```

If the list of files becomes out of date, just `grep` all the `.cpp` and `.c` files from `./src/wasm/zxing-cpp/core/src`. Yes a makefile would be better.

If you're on Windows, you can open up `cmd` and run `dir /A-D /S /B .\src\wasm\zxing-cpp\core\src\*.cpp .\src\wasm\zxing-cpp\core\src\*.c`.

## FAQ

Q) I only need to work with QR codes, no other type of barcode. Can the file be smaller?<br/>
A) Not really. There's no corresponding version of [ZXing::ReadBarcodes](./zxing-cpp/core/src/MultiFormatReader.cpp) for a single format and one cannot be easily created. While `ZXing::ReadBarcodes` does the obvious job of barcode detection, it also handles the process of *converting a camera image into a scannable binary bitmap*, and does so using private implementation details.

<hr>

Q) I only need to scan xor generate barcodes. Can the file be smaller?<br/>
A) While much more feasible than narrowing the barcode type, it is not currently planned at time of writing.

<hr>

Q) Why not use a Makefile?<br/>
A) I lost it, somewhere at the intersection of laziness and sunk-cost fallacy. It all links the same anyways.

<hr>