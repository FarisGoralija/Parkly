import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BackButton = ({ color = "#1E1E1E", ...props }) => ( // ✅ color prop with default
  <Svg
    width={12}
    height={21}
    viewBox="0 0 12 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.5 18.75L1.5 10.5L10.5 2.25"
      stroke={color}      
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackButton;
