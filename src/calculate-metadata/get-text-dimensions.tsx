import { measureText } from "@remotion/layout-utils";
import { tabSize, fontFamily, fontSize, lineHeight } from "../font";

export const getTextDimensions = (contents: string) => {
  const widthPerCharacter = measureText({
    text: "A",
    fontFamily,
    fontSize,
    validateFontIsLoaded: true,
  }).width;

  const lines = contents.trimEnd().split("\n");

  const maxCharacters = Math.max(
    ...lines
      .map((value) => value.replaceAll("\t", " ".repeat(tabSize)).length)
      .flat(),
  );

  console.log(lines);

  const codeWidth = widthPerCharacter * maxCharacters;
  return { width: codeWidth, height: lines.length * fontSize * lineHeight };
};
