import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const UsernameIcon = (props) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={35} height={35} fill="url(#pattern0_169_116)" />
    <Defs>
      <Pattern
        id="pattern0_169_116"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_169_116" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_169_116"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default UsernameIcon;
