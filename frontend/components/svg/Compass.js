import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const Compass = (props) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={25} height={25} fill="url(#pattern0_138_33)" />
    <Defs>
      <Pattern
        id="pattern0_138_33"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_138_33" transform="scale(0.0111111)" />
      </Pattern>
      <Image
        id="image0_138_33"
        width={90}
        height={90}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default Compass;
