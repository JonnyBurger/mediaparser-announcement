import { parseMedia } from "@remotion/media-parser";

// ---cut---
const result = await parseMedia({
  src: "https://example.com/video.mp4",
  fields: {
    durationInSeconds: true,
    dimensions: true,
    fps: true,
    slowKeyframes: true,
    slowVideoBitrate: true,
  },
});

result.durationInSeconds; // 29.7
