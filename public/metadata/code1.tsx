import { parseMedia } from "@remotion/media-parser";

// ---cut---
const result = await parseMedia({
  src: "https://example.com/video.mp4",
  fields: {
    durationInSeconds: true,
    dimensions: true,
  },
});

result.durationInSeconds; // 29.7
