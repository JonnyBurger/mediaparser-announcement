import { parseMedia } from "@remotion/media-parser";

// ---cut---
await parseMedia({
  src: "https://parser.media/video.webm",
  onAudioTrack: ({ track }) => {
    console.log(track.codec); // "opus"
    return (sample) => {
      console.log(sample.timestamp); // 0
      console.log(sample.duration); // 1024
      console.log(sample.data); // Uint8Array
    };
  },
});
