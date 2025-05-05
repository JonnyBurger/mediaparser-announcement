import { staticFile } from "remotion";

export type PublicFolderFile = {
  filename: string;
  value: string;
  durationInFrames: number;
};

export const getFiles = async () => {
  const codeFiles = [
    { durationInFrames: 190, filename: "metadata/code1.tsx" },
    { durationInFrames: 50, filename: "metadata/code2.tsx" },
    { durationInFrames: 40, filename: "metadata/code3.tsx" },
    { durationInFrames: 51, filename: "metadata/code4.tsx" },
    { durationInFrames: 34, filename: "metadata/code5.tsx" },
    { durationInFrames: 80, filename: "metadata/code6.tsx" },
  ];

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
