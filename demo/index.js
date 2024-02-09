import { BarcodeAnimatingScanner, BarcodeEncoder, QrEncoder } from "../dist/index.js";
const { promise: loadedPromise, resolve: documentLoaded } = Promise.withResolvers();
(() => { (document.readyState === "loading") ? document.addEventListener("DOMContentLoaded", () => { documentLoaded(); }, { once: true }) : documentLoaded(); })();

/** */
let url;
(async () => {
    await loadedPromise;

    const qrEncoder = new QrEncoder();
    const barcodeEncoder = new BarcodeEncoder();

    // Race conditions abound with tying async functions to sync event handlers, 
    // but it's a demo, it's fine.
    let preexisting = undefined;
    async function onQueuePushed() {
        if (preexisting) {
            await preexisting;
        }
        //preexisting = qrEncoder.encode(inputTextElement.value, { errorCorrection: inputEccElement.value });
        preexisting = barcodeEncoder.encode(inputTextElement.value, { format: inputFormatElement.value, errorCorrection: +inputEccElement.value.substr(0, 1) * 2 });
        try {
            inputTextElement.style.backgroundColor = null;
            let blob = await preexisting;
            if (url)
                URL.revokeObjectURL(url);
            url = URL.createObjectURL(blob);
            document.getElementById('qr-output').src = url;

        }
        catch (ex) {
            // Should only happen on 0-length text
            inputTextElement.style.backgroundColor = '#F22';
        }
        finally {
            preexisting = undefined;
        }
    }
    const videoElement = document.getElementById('camera');
    const canvasElement = document.getElementById('animator');
    const inputTextElement = document.getElementById('qr-input-text');
    const inputEccElement = document.getElementById('qr-input-ecc');
    const inputFormatElement = document.getElementById('qr-input-format');
    const scannedTextElement = document.getElementById('output-text');
    inputTextElement.addEventListener('input', e => { onQueuePushed(); });
    inputEccElement.addEventListener('input', e => { onQueuePushed(); });
    inputFormatElement.addEventListener('input', e => { onQueuePushed(); });
    onQueuePushed();

    const scanner = new BarcodeAnimatingScanner({ video: videoElement, canvas: canvasElement });
    await scanner.changeMedia();
    while (true) {
        const results = await scanner.scanOnce();
        if (scannedTextElement) {
            for (const r of results) {
                scannedTextElement.value = `${r.text}\n${scannedTextElement.value}`;
            }
        }
    }
})()