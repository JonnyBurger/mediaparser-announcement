import { parseMedia, IsAnImageError } from "@remotion/media-parser";

// ---cut---

try {
  await parseMedia({
    src: "https://jonny.io/avatar.png",
  });
} catch (e) {
  if (e instanceof IsAnImageError) {
    e.imageType // "png"
    e.dimensions?.width // 1080
    e.dimensions?.height // 1080
  }
}
