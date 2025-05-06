// @noErrors
const decoder = new VideoDecoder({
  error: console.error,
  output: console.log,
});

decoder.configure({
  codec: "vp8",
});

decoder.decode(videoSample);
