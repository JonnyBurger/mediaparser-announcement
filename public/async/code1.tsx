import { parseMedia, mediaParserController } from "@remotion/media-parser";

// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://example.com/video.mp4",
  controller,
  onVideoTrack: () => {
    return async () => {

    };
  },
});
