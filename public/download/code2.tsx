import { downloadAndParseMedia } from "@remotion/media-parser";
import { nodeWriter } from "@remotion/media-parser/node-writer";

await downloadAndParseMedia({
  src: "https://parser.media/video.mp4",
  writer: nodeWriter("output.mp4"),
  onDurationInSeconds: (duration) => {
    if (duration && duration > 600) {
      throw new Error("Video is too long");
    }
  },
});
