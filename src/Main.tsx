import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { ProgressBar } from "./ProgressBar";
import { CodeTransition } from "./CodeTransition";
import { HighlightedCode } from "codehike/code";
import { ThemeColors, ThemeProvider } from "./calculate-metadata/theme";
import { useMemo } from "react";
import { RefreshOnCodeChange } from "./ReloadOnCodeChange";
import { verticalPadding } from "./font";

export type Props = {
  steps: HighlightedCode[] | null;
  themeColors: ThemeColors | null;
  codeWidth: number | null;
};

export const Main: React.FC<Props> = ({ steps, themeColors, codeWidth }) => {
  if (!steps) {
    throw new Error("Steps are not defined");
  }

  const { durationInFrames } = useVideoConfig();
  const stepDuration = durationInFrames / steps.length;
  const transitionDuration = 30;

  if (!themeColors) {
    throw new Error("Theme colors are not defined");
  }

  const style: React.CSSProperties = useMemo(() => {
    return {
      padding: `${verticalPadding}px 0px`,
      backgroundColor: themeColors.background,
      position: "relative",
      borderRadius: 19,
      border: "5px solid black",
      borderBottom: "10px solid black",
    };
  }, [themeColors.background]);

  return (
    <ThemeProvider themeColors={themeColors}>
      <AbsoluteFill
        style={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          padding: 18,
        }}
      >
        <Sequence width={1044} height={1044} style={style}>
          <AbsoluteFill
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
            }}
          >
            <Series>
              {steps.map((step, index) => (
                <Series.Sequence
                  key={index}
                  layout="none"
                  durationInFrames={stepDuration}
                  name={step.meta}
                >
                  <CodeTransition
                    oldCode={steps[index - 1]}
                    newCode={step}
                    durationInFrames={transitionDuration}
                  />
                </Series.Sequence>
              ))}
            </Series>
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
      <RefreshOnCodeChange />
    </ThemeProvider>
  );
};
