import { AbsoluteFill, Img } from "remotion";

export const MediaParserEndCard: React.FC = () => {
  return (
    <AbsoluteFill className="bg-white flex items-center justify-center flex-row gap-10">
      <Img
        src={
          "https://github.com/remotion-dev/brand/raw/main/withouttitle/element-0.png"
        }
        style={{ height: 180 }}
      ></Img>
      <div
        style={{
          fontFamily: "GT Planar",
          fontSize: 48 * 1.5,
          textAlign: "center",
          fontWeight: "500",
          fontFeatureSettings: '"ss03" on',
        }}
      >
        Remotion Media Parser
      </div>
    </AbsoluteFill>
  );
};
