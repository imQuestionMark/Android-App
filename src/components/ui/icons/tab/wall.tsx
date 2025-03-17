import { G, Path, Svg, type SvgProps } from 'react-native-svg';

const Wall = ({ ...props }: SvgProps) => {
  return (
    <>
      <Svg width="40" height="34" viewBox="0 0 40 34" fill="none" {...props}>
        <G clipPath="url(#clip0_3158_721)" filter="url(#filter0_d_3158_721)">
          <Path
            d="M21.1875 11.5H35.4375V7C35.4375 6.73478 35.3124 6.48043 35.0897 6.2929C34.867 6.10536 34.5649 6 34.25 6H21.1875V11.5Z"
            fill="white"
          />
          <Path d="M35.4375 13.5H28.3125V19H35.4375V13.5Z" fill="white" />
          <Path d="M25.9375 13.5H14.0625V19H25.9375V13.5Z" fill="white" />
          <Path d="M11.6875 13.5H4.5625V19H11.6875V13.5Z" fill="white" />
          <Path
            d="M21.1875 21V26H34.25C34.5649 26 34.867 25.8946 35.0897 25.7071C35.3124 25.5196 35.4375 25.2652 35.4375 25V21H21.1875ZM18.8125 11.5V6H5.75C5.43506 6 5.13301 6.10536 4.91031 6.2929C4.68762 6.48043 4.5625 6.73478 4.5625 7V11.5H18.8125ZM18.8125 21H4.5625V25C4.5625 25.2652 4.68762 25.5196 4.91031 25.7071C5.13301 25.8946 5.43506 26 5.75 26H18.8125V21Z"
            fill="white"
          />
        </G>
      </Svg>
    </>
  );
};

export default Wall;
