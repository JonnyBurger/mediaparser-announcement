import { parseMedia, mediaParserController } from "@remotion/media-parser";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://parser.media/video.mp4",
  controller,
  onVideoTrack: ({ track }) => {
    return async ({ timestamp }) => {
      let sec = timestamp / track.timescale;

      // Only read first 10 seconds
      if (sec > 10) {
        controller.abort();
      }
    };
  },
});
