import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const CaretDown = ({ color, ...props }: SvgProps) => (
  <Svg
    width={12}
    height={13}
    fill="none"
    color={color}
    {...props}
    className="stroke-black dark:stroke-white"
  >
    <Path
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 4.744 6 8.494l-3.75-3.75"
    />
  </Svg>
);
