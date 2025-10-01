import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DoneIcon = ({ width = 16, height = 16, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path
      fill={color}
      fillRule="evenodd"
      id="Status-Approved-Filled"
      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0M9.5 18.3l-5.6-5.7 1.8-1.8 3.9 3.9L18 6.3l1.8 1.8z"
      clipRule="evenodd"
     />
  </Svg>
);

export default DoneIcon;

