import { staticFile } from "remotion";

export type PublicFolderFile = {
  filename: string;
  value: string;
  durationInFrames: number;
};

const getCodeSnippets = (compositionId: string) => {
  if (compositionId === "Metadata") {
    return [
      { durationInFrames: 190, filename: "metadata/code1.tsx" },
      { durationInFrames: 50, filename: "metadata/code2.tsx" },
      { durationInFrames: 40, filename: "metadata/code3.tsx" },
      { durationInFrames: 51, filename: "metadata/code4.tsx" },
      { durationInFrames: 200, filename: "metadata/code6.tsx" },
    ];
  }

  if (compositionId === "Samples") {
    return [
      { durationInFrames: 190, filename: "samples/code2.tsx" },
      { durationInFrames: 240, filename: "samples/code1.tsx" },
    ];
  }

  if (compositionId === "Webcodecs") {
    return [
      { durationInFrames: 190, filename: "webcodecs/code1.tsx" },
      { durationInFrames: 240, filename: "webcodecs/code2.tsx" },
    ];
  }

  if (compositionId === "Decoder") {
    return [{ durationInFrames: 240, filename: "decoder/code1.tsx" }];
  }
  if (compositionId === "Async") {
    return [
      { durationInFrames: 240, filename: "async/code1.tsx" },
      { durationInFrames: 30, filename: "async/code2.tsx" },
      { durationInFrames: 60, filename: "async/code4.tsx" },
      { durationInFrames: 65, filename: "async/code6.tsx" },
      { durationInFrames: 240, filename: "async/code7.tsx" },
    ];
  }
  if (compositionId === "Callbacks") {
    return [
      { durationInFrames: 360, filename: "callbacks/code1.tsx" },
      { durationInFrames: 240, filename: "callbacks/code2.tsx" },
    ];
  }

  if (compositionId === "Worker") {
    return [
      { durationInFrames: 240, filename: "worker/code1.tsx" },
      { durationInFrames: 150, filename: "worker/code2.tsx" },
      { durationInFrames: 240, filename: "worker/code3.tsx" },
    ];
  }

  if (compositionId === "Downloads") {
    return [
      { durationInFrames: 120, filename: "download/code1.tsx" },
      { durationInFrames: 120, filename: "download/code2.tsx" },
      { durationInFrames: 120, filename: "download/code3.tsx" },
    ];
  }
  if (compositionId === "ForeignMedia") {
    return [
      { durationInFrames: 80, filename: "unsupported-media/code0.tsx" },
      { durationInFrames: 140, filename: "unsupported-media/code1.tsx" },
      { durationInFrames: 238, filename: "unsupported-media/code2.tsx" },
      { durationInFrames: 180, filename: "unsupported-media/code3.tsx" },
      { durationInFrames: 15 * 30, filename: "unsupported-media/code4.tsx" },
      { durationInFrames: 120, filename: "unsupported-media/code5.tsx" },
    ];
  }

  throw new Error(`Unknown composition id: ${compositionId}`);
};

export const getFiles = async (compositionId: string) => {
  const codeFiles = getCodeSnippets(compositionId);

  const contents = codeFiles.map(async (file): Promise<PublicFolderFile> => {
    const contents = await fetch(staticFile(file.filename));
    const text = await contents.text();

    return {
      filename: file.filename,
      value: text,
      durationInFrames: file.durationInFrames,
    };
  });

  return Promise.all(contents);
};
