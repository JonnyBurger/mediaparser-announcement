import { parseMediaOnWebWorker } from "@remotion/media-parser/worker";

await parseMediaOnWebWorker({
  src: "https://example.com/video.mp4",
  // ...
});
