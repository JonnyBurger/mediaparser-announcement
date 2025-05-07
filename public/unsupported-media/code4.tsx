import {
  parseMedia,
  IsAnImageError,
  IsAGifError,
  IsAPdfError,
  IsAnUnsupportedFileTypeError,
} from "@remotion/media-parser";

// ---cut---

try {
  await parseMedia({
    src: "https://jonny.io/avatar.png",
  });
} catch (e) {
  if (e instanceof IsAnImageError) {
    console.log("This is an image");
  } else if (e instanceof IsAGifError) {
    console.log("This is a GIF");
  } else if (e instanceof IsAPdfError) {
    console.log("This is a PDF");
  } else {
    throw e;
  }
}
