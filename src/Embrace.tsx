import { Sequence, useVideoConfig } from "remotion";
import { WebAPIs } from "./WebAPIs";

export const Embrace: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <Sequence className="bg-background">
      <Sequence width={width / 2} height={1080}>
        <WebAPIs
          {...{
            api1: {
              name: "fetch()",
              color: "#618EC1",
            },
            api2: {
              name: "VideoDecoder",
              color: "#B067E3",
            },
            api3: {
              name: "AudioData",
              color: "#618EC1",
            },
            title1: "Integrates with",
            title2: "Web APIs",
          }}
        ></WebAPIs>
      </Sequence>
      <Sequence
        width={width / 2}
        height={1080}
        style={{
          left: width / 2,
        }}
        from={60}
      >
        <WebAPIs
          {...{
            api1: {
              name: "async",
              color: "#FF4C8C",
            },
            api2: {
              name: "AbortController",
              color: "#B067E3",
            },
            api3: {
              name: "Worker",
              color: "#B067E3",
            },
            title1: "         Embraces",
            title2: "the language",
          }}
        ></WebAPIs>
      </Sequence>
    </Sequence>
  );
};
