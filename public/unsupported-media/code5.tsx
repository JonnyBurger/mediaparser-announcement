import {
  parseMedia,
  IsAnImageError,
  IsAGifError,
  IsAPdfError,
  IsAnUnsupportedFileTypeError,
} from "@remotion/media-parser";

// @noErrors
// ---cut---

await parseMedia({
  src: "https://jonny.io/avatar.png",
  fields: {
    durationInSeconds: true,
  },
  onVideoTrack: () => {
    // Process video...
  },
  onAudioTrack: () => {
    // Process audio...
  },
});
