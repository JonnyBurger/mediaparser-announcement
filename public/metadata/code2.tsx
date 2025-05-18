import { parseMedia } from "@remotion/media-parser";

// ---cut---
const result = await parseMedia({
  src: "https://parser.media/video.mp4",
  fields: {
    durationInSeconds: true,
    dimensions: true,
    fps: true,
  },
});

result.durationInSeconds; // 29.7
