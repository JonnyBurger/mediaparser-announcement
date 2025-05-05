import { AbsoluteFill, Sequence, Series } from "remotion";
import { CodeTransition } from "./CodeTransition";
import { HighlightedCode } from "codehike/code";
import { ThemeColors, ThemeProvider } from "./calculate-metadata/theme";
import { useMemo } from "react";
import { RefreshOnCodeChange } from "./ReloadOnCodeChange";
import { verticalPadding } from "./font";

export type Props = {
  steps: (HighlightedCode & { durationInFrames: number })[] | null;
  themeColors: ThemeColors | null;
};

export const CodeAnimations: React.FC<Props> = ({ steps, themeColors }) => {
  if (!steps) {
    throw new Error("Steps are not defined");
  }

  if (!themeColors) {
    throw new Error("Theme colors are not defined");
  }

  const style: React.CSSProperties = useMemo(() => {
    return {
      padding: `${verticalPadding}px 0px`,
      backgroundColor: themeColors.background,
      position: "relative",
      borderLeft: "2px solid rgba(255, 255, 255, 0.1)",
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
        }}
      >
        <Sequence width={1044} height={1080} style={style}>
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
                  durationInFrames={step.durationInFrames}
                  name={step.meta}
                >
                  <CodeTransition
                    previousCode={steps[index - 1]}
                    currentCode={step}
                    nextCode={steps[index + 1]}
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
