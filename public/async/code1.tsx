import { parseMedia, mediaParserController } from "@remotion/media-parser";

// ---cut---

const controller = mediaParserController();

await parseMedia({
  src: "https://parser.media/video.mp4",
  controller,
  onVideoTrack: () => {
    return async () => {

    };
  },
});
