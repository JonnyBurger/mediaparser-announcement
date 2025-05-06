import { parseMedia } from "@remotion/media-parser";

// ---cut---
const decoder = new VideoDecoder({
  error: console.error,
  output: console.log,
});

await parseMedia({
  src: "https://example.com/video.mp4",
  onVideoTrack: async ({ track }) => {
    decoder.configure(track);
    
    return (sample) => {
      decoder.decode(
        new EncodedVideoChunk(sample)
      );
    };
  },
});
