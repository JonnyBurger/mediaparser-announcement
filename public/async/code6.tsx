import { parseMedia, mediaParserController } from "@remotion/media-parser";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://example.com/video.mp4",
  controller,
  onVideoTrack: ({ track: { timescale } }) => {
    return async ({ timestamp }) => {
      const sec = timestamp / timescale;

      // Only read first 10 seconds
      if (sec > 10) {
        controller.abort();
      }
    };
  },
});
