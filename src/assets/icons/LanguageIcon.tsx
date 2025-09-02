import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type IconProps = {
  inactiveColor?: string;
  activeColor?: string;
  isFocused?: boolean;
}

export default function LanguageIcon({ inactiveColor, activeColor, isFocused = false }: IconProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={isFocused ? activeColor : inactiveColor}
        fill="none"
      />
      <Path
        d="M12 22q4-3.636 4-10T12 2Q8 5.637 8 12q0 6.364 4 10M2.5 9h19m-19 6h19"
        fill={isFocused ? activeColor : 'none'}
        stroke={isFocused ? activeColor : inactiveColor}
        fillRule="evenodd"
      />
    </Svg>
  );
}
