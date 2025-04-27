import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function HeartIcon({ size = 24, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21s-7.5-4.35-10-10c-2-4.7 1-9 5-9 2 0 4 1.5 5 3 1-1.5 3-3 5-3 4 0 7 4.3 5 9-2.5 5.65-10 10-10 10z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
