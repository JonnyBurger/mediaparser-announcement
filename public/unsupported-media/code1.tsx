import { parseMedia } from "@remotion/media-parser";

// ---cut---

try {
  await parseMedia({
    src: "https://jonny.io/avatar.png",
  });
} catch (e) {
  console.error(e);
}
