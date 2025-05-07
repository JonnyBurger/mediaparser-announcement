import { parseMedia, IsAnImageError } from "@remotion/media-parser";

// ---cut---

try {
  await parseMedia({
    src: "https://jonny.io/avatar.png",
  });
} catch (e) {
  if (e instanceof IsAnImageError) {
    console.log("This is an image");
  }
}
