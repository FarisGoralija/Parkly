import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const BlueHeart = (props) => (
  <Svg
    width={33}
    height={42}
    viewBox="0 0 33 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect
      width={33}
      height={42}
      transform="matrix(-1 0 0 1 33 0)"
      fill="url(#pattern0_522_50)"
    />
    <Defs>
      <Pattern
        id="pattern0_522_50"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#image0_522_50"
          transform="matrix(0.01 0 0 0.00785714 0 0.107143)"
        />
      </Pattern>
      <Image
        id="image0_522_50"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default BlueHeart;
