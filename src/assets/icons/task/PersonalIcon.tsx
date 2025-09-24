import React from "react";
import Svg, { Path } from "react-native-svg";

const PersonalIcon = ({ width = 16, height = 16, color = "black" }) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M22 22H2M2 11l8.126-6.5a3 3 0 0 1 3.748 0L22 11M15.5 5.5v-2A.5.5 0 0 1 16 3h2.5a.5.5 0 0 1 .5.5v5M4 22V9.5M20 22V9.5"
    ></Path>
    <Path
      stroke={color}
      strokeWidth="1.5"
      d="M15 22v-5c0-1.414 0-2.121-.44-2.56C14.122 14 13.415 14 12 14s-2.121 0-2.56.44C9 14.878 9 15.585 9 17v5M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    ></Path>
  </Svg>
);

export default PersonalIcon;
