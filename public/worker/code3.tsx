import { parseMediaOnWebWorker } from "@remotion/media-parser/worker";

await parseMediaOnWebWorker({
  src: "https://parser.media/video.mp4",
  // ...
});

// No other changes necessary!
