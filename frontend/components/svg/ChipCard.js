import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const ChipCard = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 67 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={67} height={74} fill="url(#pattern0_545_51)" />
    <Defs>
      <Pattern
        id="pattern0_545_51"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#image0_545_51"
          transform="matrix(0.01 0 0 0.00905405 0 0.0472973)"
        />
      </Pattern>
      <Image
        id="image0_545_51"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default ChipCard;
