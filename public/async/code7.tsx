import { parseMedia, mediaParserController } from "@remotion/media-parser";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://example.com/video.mp4",
  controller,
  onVideoTrack: ({ track: { timescale } }) => {
    return async ({ timestamp }) => {
      // Rewind 5 seconds
      controller.seek(timestamp / timescale - 5);
    };
  },
});
