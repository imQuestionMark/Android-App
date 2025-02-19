import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const Style = ({ color, ...props }: SvgProps) => (
  <Svg width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <G
      stroke={color}
      strokeWidth={2.438}
      strokeLinecap="round"
      clipPath="url(#style)"
      strokeLinejoin="round"
    >
      <Path d="M6.94 10.125a3.188 3.188 0 1 0 0-6.375 3.188 3.188 0 0 0 0 6.375ZM17.064 10.125a3.188 3.188 0 1 0 0-6.375 3.188 3.188 0 0 0 0 6.375ZM6.94 20.25a3.188 3.188 0 1 0 0-6.375 3.188 3.188 0 0 0 0 6.375ZM17.064 20.25a3.188 3.188 0 1 0 0-6.375 3.188 3.188 0 0 0 0 6.375Z" />
    </G>
    <Defs>
      <ClipPath id="style">
        <Path fill="#fff" d="M0 0h24v24H0z" transform="translate(.002)" />
      </ClipPath>
    </Defs>
  </Svg>
);
