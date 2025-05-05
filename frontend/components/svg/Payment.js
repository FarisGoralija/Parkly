import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const Payment = (props) => (
  <Svg
    width={62}
    height={63}
    viewBox="0 0 62 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={31} cy={31.5} r={29.5} stroke="#1CD150" strokeWidth={3} />
    <Path d="M15.5 30L25.5 40L46 21" stroke="#1CD150" strokeWidth={3} />
  </Svg>
);
export default Payment;
