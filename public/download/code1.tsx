import { downloadAndParseMedia } from "@remotion/media-parser";
import { nodeWriter } from "@remotion/media-parser/node-writer";

await downloadAndParseMedia({
  src: "https://example.com/video.mp4",
  writer: nodeWriter("output.mp4"),
});
