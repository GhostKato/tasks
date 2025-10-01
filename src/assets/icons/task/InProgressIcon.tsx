import React from 'react';
import Svg, { Path } from 'react-native-svg';

const InProgressIcon = ({ width = 16, height = 16, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 12 12">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12m-.629-8.42a2.5 2.5 0 0 1 1.45.059.75.75 0 0 0 .493-1.417 4 4 0 1 0 2.464 5.092.75.75 0 1 0-1.417-.493 2.5 2.5 0 1 1-2.99-3.24z"
      clipRule="evenodd"
     />
  </Svg>
);

export default InProgressIcon;

