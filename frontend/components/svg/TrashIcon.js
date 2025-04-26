import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TrashIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M3 6h18M8 6v12m8-12v12M5 6l1 14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2l1-14M9 6V4c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2"
      stroke="#FF3B30" // ✅ RED color like your screenshot
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TrashIcon;
