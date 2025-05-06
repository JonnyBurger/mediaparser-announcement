import { parseMedia } from "@remotion/media-parser";

// ---cut---
await parseMedia({
  src: "https://example.com/video.webm",
  onVideoTrack: ({ track }) => {
    console.log(track.codec); // "vp8"
    return (sample) => {
      console.log(sample.timestamp); // 0
      console.log(sample.duration); // 40000
      console.log(sample.data); // Uint8Array
    };
  },
});
