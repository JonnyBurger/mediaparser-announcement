import { parseMedia, mediaParserController } from "@remotion/media-parser";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://parser.media/video.mp4",
  controller,
  onVideoTrack: () => {
    return async () => {
      controller.pause();
      await sleep(1000);
    };
  },
});
