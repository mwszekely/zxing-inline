#include "qrcode/QRReader.h"
#include "ReaderOptions.h"
#include "ReadBarcode.h"
#include "MultiFormatWriter.h"
#include "BitMatrix.h"
#include "BitMatrixIO.h"
#include "emscripten.h"
#include "fnv.h"
#include <cstdint>

#ifdef __INTELLISENSE__
#define EMSCRIPTEN_KEEPALIVE
#endif

#if 0
const thread_local ZXing::QRCode::Reader* qrReaderFast;
const thread_local ZXing::QRCode::Reader* qrReaderHard;

void initialize() {
    ZXing::ReaderOptions optionsFast{ };
    ZXing::ReaderOptions optionsHard{ };
    optionsFast.setTryHarder(false);
    optionsHard.setTryHarder(true);
    qrReaderFast = new ZXing::QRCode::Reader{ optionsFast, true };
    qrReaderHard = new ZXing::QRCode::Reader{ optionsHard, true };
}

void cleanup() {
    delete qrReaderFast;
    delete qrReaderHard;
    qrReaderFast = qrReaderHard = nullptr;
}
#endif

// These are global variables that are clobbered every time the next result is fetched
// (since there's no good JS<->WASM interop for passing objects around, we just say
// "here's a pointer to what you need, copy it before looking at the next one if you need to")
//
// Note that some of these are whole strings, instead of just cstr pointers.
// This is because some of the ZXing getters return local, stack-based strings that we can't
// return pointer references to. So we just copy them wholesale. (They're probably std::move'd anyway, right?)
thread_local std::uint32_t resultIndex = 0;
thread_local ZXing::Results results;
thread_local std::string textResult;
thread_local ZXing::ByteArray dataResult;

extern "C"
{
	// BarcodeFormat is bitwise, so it could conceivably exceed 32 bits.
	// If that happens, throw a compiler error so anything related to it 
	// in JS can be retyped as bigints instead of numbers...
	static_assert(static_cast<uint_least64_t>(ZXing::BarcodeFormat::_max) <= std::numeric_limits<int>::max());

	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatAztec() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::Aztec); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatCodabar() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::Codabar); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatCode128() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::Code128); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatCode39() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::Code39); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatCode93() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::Code93); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatDataBar() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::DataBar); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatDataBarExpanded() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::DataBarExpanded); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatDataMatrix() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::DataMatrix); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatDXFilmEdge() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::DXFilmEdge); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatEAN13() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::EAN13); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatEAN8() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::EAN8); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatITF() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::ITF); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatLinearCodes() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::LinearCodes); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatMatrixCodes() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::MatrixCodes); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatMaxiCode() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::MaxiCode); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatMicroQRCode() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::MicroQRCode); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatNone() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::None); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatPDF417() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::PDF417); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatQRCode() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::QRCode); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatRMQRCode() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::RMQRCode); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatUPCA() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::UPCA); }
	EMSCRIPTEN_KEEPALIVE const constexpr std::uint32_t formatUPCE() { return static_cast<std::uint32_t>(ZXing::BarcodeFormat::UPCE); }

	// Meanwhile these are all sequential integers.
	// TODO: Can we just put constants on module.exports? 
	// You'd think, but there doesn't seem to be a way to get it to work.
	// EMSCRIPTEN_KEEPALIVE by itself does nothing,
	// adding "extern" *for some reason" adds *something* to the exports,
	// but the values are just a conspicuously spaced sequence of integers
	// unrelated to any of these values (and they're not pointers, offsets
	// maybe to some unknowable structure, but not pointers)
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUnknown() { return static_cast<int>(ZXing::CharacterSet::Unknown); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetASCII() { return static_cast<int>(ZXing::CharacterSet::ASCII); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_1() { return static_cast<int>(ZXing::CharacterSet::ISO8859_1); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_2() { return static_cast<int>(ZXing::CharacterSet::ISO8859_2); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_3() { return static_cast<int>(ZXing::CharacterSet::ISO8859_3); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_4() { return static_cast<int>(ZXing::CharacterSet::ISO8859_4); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_5() { return static_cast<int>(ZXing::CharacterSet::ISO8859_5); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_6() { return static_cast<int>(ZXing::CharacterSet::ISO8859_6); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_7() { return static_cast<int>(ZXing::CharacterSet::ISO8859_7); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_8() { return static_cast<int>(ZXing::CharacterSet::ISO8859_8); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_9() { return static_cast<int>(ZXing::CharacterSet::ISO8859_9); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_10() { return static_cast<int>(ZXing::CharacterSet::ISO8859_10); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_11() { return static_cast<int>(ZXing::CharacterSet::ISO8859_11); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_13() { return static_cast<int>(ZXing::CharacterSet::ISO8859_13); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_14() { return static_cast<int>(ZXing::CharacterSet::ISO8859_14); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_15() { return static_cast<int>(ZXing::CharacterSet::ISO8859_15); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetISO8859_16() { return static_cast<int>(ZXing::CharacterSet::ISO8859_16); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetCp437() { return static_cast<int>(ZXing::CharacterSet::Cp437); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetCp1250() { return static_cast<int>(ZXing::CharacterSet::Cp1250); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetCp1251() { return static_cast<int>(ZXing::CharacterSet::Cp1251); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetCp1252() { return static_cast<int>(ZXing::CharacterSet::Cp1252); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetCp1256() { return static_cast<int>(ZXing::CharacterSet::Cp1256); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetShift_JIS() { return static_cast<int>(ZXing::CharacterSet::Shift_JIS); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetBig5() { return static_cast<int>(ZXing::CharacterSet::Big5); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetGB2312() { return static_cast<int>(ZXing::CharacterSet::GB2312); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetGB18030() { return static_cast<int>(ZXing::CharacterSet::GB18030); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetEUC_JP() { return static_cast<int>(ZXing::CharacterSet::EUC_JP); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetEUC_KR() { return static_cast<int>(ZXing::CharacterSet::EUC_KR); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUTF16BE() { return static_cast<int>(ZXing::CharacterSet::UTF16BE); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUTF8() { return static_cast<int>(ZXing::CharacterSet::UTF8); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUTF16LE() { return static_cast<int>(ZXing::CharacterSet::UTF16LE); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUTF32BE() { return static_cast<int>(ZXing::CharacterSet::UTF32BE); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetUTF32LE() { return static_cast<int>(ZXing::CharacterSet::UTF32LE); }
	EMSCRIPTEN_KEEPALIVE const constexpr int characterSetBINARY() { return static_cast<int>(ZXing::CharacterSet::BINARY); }

	EMSCRIPTEN_KEEPALIVE std::size_t scan(const std::uint8_t *data, std::uint32_t width, std::uint32_t height, ZXing::BarcodeFormat format = ZXing::BarcodeFormat::QRCode, bool hardInsteadOfFast = false)
	{
		if (data == nullptr)
			return 0;

		ZXing::ReaderOptions options{};
		options.setFormats(format);
		options.setTryHarder(hardInsteadOfFast);

		const ZXing::ImageView iv(data, width, height, ZXing::ImageFormat::RGBX);
		results = ZXing::ReadBarcodes(iv, options);
		resultIndex = 0;
		return results.size();
	}

	ZXing::Matrix<uint32_t> generatedImage;
	std::size_t generatedImageLength = 0;
	std::size_t generatedImageWidth = 0;
	std::size_t generatedImageHeight = 0;
	EMSCRIPTEN_KEEPALIVE const std::uint8_t* generate(const std::uint8_t *data, std::size_t dataByteLength, ZXing::CharacterSet characterSet = ZXing::CharacterSet::UTF8, ZXing::BarcodeFormat format = ZXing::BarcodeFormat::QRCode, int ecc = 5) {
		
		auto writer = ZXing::MultiFormatWriter(format).setEncoding(characterSet).setMargin(10).setEccLevel(ecc);

		std::wstring javaCruft;
		for (std::size_t i = 0; i < dataByteLength; ++i) {
			javaCruft.push_back(data[i]);
		}

		ZXing::BitMatrix bitMatrix = writer.encode(javaCruft, 0, 0);
		// TODO: Guarantee the endianness here works out in all situations
		generatedImage = ZXing::ToMatrix<std::uint32_t>(bitMatrix, 0xFF000000, 0xFFFFFFFF);
		generatedImageLength = static_cast<std::size_t>(generatedImage.size() * sizeof(std::uint32_t));
		generatedImageWidth = generatedImage.width();
		generatedImageHeight = generatedImage.height();

		return data;
	}

	EMSCRIPTEN_KEEPALIVE const std::uint8_t* getGeneratedImageData() { return reinterpret_cast<const uint8_t*>(generatedImage.data()); }
	EMSCRIPTEN_KEEPALIVE std::size_t getGeneratedImageLength() { return generatedImageLength; }
	EMSCRIPTEN_KEEPALIVE std::size_t getGeneratedImageWidth() { return generatedImageWidth; }
	EMSCRIPTEN_KEEPALIVE std::size_t getGeneratedImageHeight() { return generatedImageHeight; }

	EMSCRIPTEN_KEEPALIVE std::int32_t positionOfCurrentResultX(int which) {
		if (resultIndex >= results.size())
			return 0;
		return results[resultIndex].position()[which].x;
	}

	EMSCRIPTEN_KEEPALIVE std::int32_t positionOfCurrentResultY(int which) {
		if (resultIndex >= results.size())
			return 0;
			
		return results[resultIndex].position()[which].y;
	}

	EMSCRIPTEN_KEEPALIVE std::int32_t currentResultOrientation() {
		if (resultIndex >= results.size())
			return 0;
			
		return results[resultIndex].orientation();
	}

	EMSCRIPTEN_KEEPALIVE std::size_t currentResultTextLength() {
		if (resultIndex >= results.size())
			return 0;
		return results[resultIndex].text().size();
	}

	EMSCRIPTEN_KEEPALIVE std::uint32_t currentResultHash() {
		if (resultIndex >= results.size())
			return 0;
		if (results[resultIndex].contentType() == ZXing::ContentType::Text) {
			auto str = results[resultIndex].text();
			return fnv_32a_buf(const_cast<char *>(str.c_str()), str.length(), 0);
		}
		else {
			auto str = results[resultIndex].bytes();
			return fnv_32a_buf(str.data(), str.size(), FNV1_32A_INIT);
		}
	}

	EMSCRIPTEN_KEEPALIVE const char *readCurrentResultText()
	{
		if (resultIndex >= results.size())
			textResult.clear();
		else
			textResult = results[resultIndex].text();
		return textResult.c_str();
	}

	

	EMSCRIPTEN_KEEPALIVE std::size_t currentResultDataLength() {
		if (resultIndex >= results.size())
			return 0;
		return results[resultIndex].bytes().size();
	}

	EMSCRIPTEN_KEEPALIVE const std::uint8_t *readCurrentResultData()
	{
		if (resultIndex >= results.size())
			dataResult.clear();
		else
			dataResult = results[resultIndex].bytes();
		return dataResult.data();
	}

	EMSCRIPTEN_KEEPALIVE void nextResult() {
		resultIndex += 1;
	}
}

#if 0
ZXing::Results ReadBarcodes(const ZXing::ImageView& _iv, const ZXing::ReaderOptions& opts)
{
	if (sizeof(ZXing::PatternType) < 4 && opts.hasFormat(ZXing::BarcodeFormat::LinearCodes) && (_iv.width() > 0xffff || _iv.height() > 0xffff))
		throw std::invalid_argument("maximum image width/height is 65535");

	ZXing::LumImage lum;
	ZXing::ImageView iv = ZXing::SetupLumImageView(_iv, lum, opts);
	ZXing::MultiFormatReader reader(opts);

	if (opts.isPure())
		return {reader.read(*ZXing::CreateBitmap(opts.binarizer(), iv))};

	std::unique_ptr<ZXing::MultiFormatReader> closedReader;
#ifdef ZXING_BUILD_EXPERIMENTAL_API
	auto formatsBenefittingFromClosing = BarcodeFormat::Aztec | BarcodeFormat::DataMatrix | BarcodeFormat::QRCode | BarcodeFormat::MicroQRCode;
	ReaderOptions closedOptions = opts;
	if (opts.tryDenoise() && opts.hasFormat(formatsBenefittingFromClosing)) {
		closedOptions.setFormats((opts.formats().empty() ? BarcodeFormat::Any : opts.formats()) & formatsBenefittingFromClosing);
		closedReader = std::make_unique<MultiFormatReader>(closedOptions);
	}
#endif
	ZXing::LumImagePyramid pyramid(iv, opts.downscaleThreshold() * opts.tryDownscale(), opts.downscaleFactor());

	ZXing::Results results;
	int maxSymbols = opts.maxNumberOfSymbols() ? opts.maxNumberOfSymbols() : INT_MAX;
	for (auto&& iv : pyramid.layers) {
		auto bitmap = ZXing::CreateBitmap(opts.binarizer(), iv);
		for (int close = 0; close <= (closedReader ? 1 : 0); ++close) {
			if (close)
				bitmap->close();

			// TODO: check if closing after invert would be beneficial
			for (int invert = 0; invert <= static_cast<int>(opts.tryInvert() && !close); ++invert) {
				if (invert)
					bitmap->invert();
				auto rs = (close ? *closedReader : reader).readMultiple(*bitmap, maxSymbols);
				for (auto& r : rs) {
					if (iv.width() != _iv.width())
						r.setPosition(Scale(r.position(), _iv.width() / iv.width()));
					if (!ZXing::Contains(results, r)) {
						r.setReaderOptions(opts);
						r.setIsInverted(bitmap->inverted());
						results.push_back(std::move(r));
						--maxSymbols;
					}
				}
				if (maxSymbols <= 0)
					return results;
			}
		}
	}

	return results;
}
#endif
