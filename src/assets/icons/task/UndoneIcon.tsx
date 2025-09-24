import React from "react";
import Svg, { Path } from "react-native-svg";

const UndoneIcon = ({ width = 16, height = 16, color = "black" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      fill={color}
      fillRule="evenodd"  
      d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0m6.38 16.62-1.77 1.77L12 13.77l-4.62 4.62-1.77-1.77L10.23 12 5.62 7.38l1.77-1.77L12 10.23l4.62-4.62 1.77 1.77L13.77 12z"
      clipRule="evenodd"
    ></Path>
  </Svg>
);

export default UndoneIcon;

