import { parseMedia } from "@remotion/media-parser";

// @noErrors
// ---cut---

await parseMedia({
  src: "https://parser.media/video.mp4",
  onDurationInSeconds: (duration) => {
    if (duration > 60) {
      throw new Error("Video is too long");
    }
  },
});
