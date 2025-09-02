import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type IconProps = {
  inactiveColor?: string;
  activeColor?: string;
  isFocused?: boolean;
}

export default function AboutIcon({inactiveColor, activeColor, isFocused = false}: IconProps) {
  return (
     <Svg    
    width="19"
    height="19"
    viewBox="0 0 512 512"
  >
    <G clipPath="url(#clip0_90_362)">
      <G clipPath="url(#clip0_90_362)">
             <Path
        fill={isFocused ? activeColor : inactiveColor}
        
                 fillRule="evenodd"
                 clipRule="evenodd"
          id="Shape"
          d="M213.333 0C95.513 0 0 95.512 0 213.333c0 117.82 95.513 213.334 213.333 213.334 117.822 0 213.334-95.513 213.334-213.334S331.155 0 213.333 0m0 384c-94.105 0-170.666-76.561-170.666-170.667s76.56-170.666 170.666-170.666C307.44 42.667 384 119.227 384 213.333S307.44 384 213.333 384m26.714-256c0 15.468-11.262 26.667-26.497 26.667-15.851 0-26.837-11.2-26.837-26.963 0-15.15 11.283-26.37 26.837-26.37 15.235 0 26.497 11.22 26.497 26.666m-48 64h42.666v128h-42.666z"
        ></Path>
      </G>
    </G>
  </Svg>
  );
}












