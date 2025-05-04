import { HighlightedCode, Pre } from "codehike/code";
import {
  getStartingSnapshot,
  calculateTransitions,
} from "codehike/utils/token-transitions";
import ReactDOM from "react-dom/server";

const getPre = (code: HighlightedCode, style: React.CSSProperties) => {
  const pre = <Pre code={code} style={style} />;
  const root = ReactDOM.renderToStaticMarkup(pre);

  const newPre = document.createElement("pre");
  newPre.innerHTML = root;
  for (const key of Object.keys(style)) {
    // @ts-expect-error works
    newPre.style[key] = style[key];
  }

  return newPre;
};

export const getCodeSnapshot = ({
  before,
  after,
  current,
  style,
}: {
  before: HighlightedCode;
  after: HighlightedCode;
  current: HTMLPreElement;
  style: React.CSSProperties;
}) => {
  const beforePre = getPre(before, style);
  const afterPre = getPre(after, style);

  const transitionsBefore = calculateTransitions(
    current,
    getStartingSnapshot(beforePre),
  );

  const transitionsAfter = calculateTransitions(
    current,
    getStartingSnapshot(afterPre),
  );

  console.log(transitionsBefore, transitionsAfter);

  return { transitionsBefore, transitionsAfter };
};
