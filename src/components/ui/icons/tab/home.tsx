import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const Home = ({ color, fill, ...props }: SvgProps) => {
  return (
    <>
      <Svg color={color} fill={fill} {...props}>
        <G clipPath="url(#clip0_3145_703)">
          <Path
            d="M3 6.625V14C3 14.1326 3.05268 14.2598 3.14645 14.3536C3.24021 14.4473 3.36739 14.5 3.5 14.5H6.5V10.25C6.5 10.0511 6.57902 9.86032 6.71967 9.71967C6.86032 9.57902 7.05109 9.5 7.25 9.5H9.75C9.94891 9.5 10.1397 9.57902 10.2803 9.71967C10.421 9.86032 10.5 10.0511 10.5 10.25V14.5H13.5C13.6326 14.5 13.7598 14.4473 13.8536 14.3536C13.9473 14.2598 14 14.1326 14 14V6.625"
            fill={color}
          />
          <Path
            d="M3 6.625V14C3 14.1326 3.05268 14.2598 3.14645 14.3536C3.24021 14.4473 3.36739 14.5 3.5 14.5H6.5V10.25C6.5 10.0511 6.57902 9.86032 6.71967 9.71967C6.86032 9.57902 7.05109 9.5 7.25 9.5H9.75C9.94891 9.5 10.1397 9.57902 10.2803 9.71967C10.421 9.86032 10.5 10.0511 10.5 10.25V14.5H13.5C13.6326 14.5 13.7598 14.4473 13.8536 14.3536C13.9473 14.2598 14 14.1326 14 14V6.625"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M15.5 7.99994L8.84031 1.62494C8.68406 1.45994 8.31875 1.45807 8.15969 1.62494L1.5 7.99994M13 5.59369V1.99994H11.5V4.15619"
            fill={color}
          />
          <Path
            d="M15.5 7.99994L8.84031 1.62494C8.68406 1.45994 8.31875 1.45807 8.15969 1.62494L1.5 7.99994M13 5.59369V1.99994H11.5V4.15619"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_3145_703">
            <Rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0.5)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
};

export default Home;
