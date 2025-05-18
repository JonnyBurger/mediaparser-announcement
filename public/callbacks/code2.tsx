import { parseMedia } from "@remotion/media-parser";

// @noErrors
// ---cut---

await parseMedia({
  src: "https://parser.media/video.mp4",
  onVideoTrack: () => {
    return async (sample) => {
      await waitInQueue();
      await processSample(sample);
    };
  },
});
