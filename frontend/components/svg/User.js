import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const User = (props) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={35} height={35} fill="url(#pattern0_169_51)" />
    <Defs>
      <Pattern
        id="pattern0_169_51"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_169_51" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_169_51"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default User;
