import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type IconProps = {
  inactiveColor?: string;
  activeColor?: string;
  isFocused?: boolean;
}

export default function HomeIcon({inactiveColor, activeColor, isFocused = false}: IconProps) {
  return (
    <Svg    
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 16 16"
  >
    <G clipPath="url(#clip0_90_362)">
      <Path
        fill={isFocused ? activeColor : 'none'}
        stroke={!isFocused ? inactiveColor : null}
        fillRule="evenodd"
        d="M8 0 0 6v2h1v7h3v-5h3v5h8V8h1V6l-2-1.5V1h-3v1.25zm1 10h3v3H9z"
        clipRule="evenodd"
      ></Path>
    </G>
  </Svg>
  );
}










