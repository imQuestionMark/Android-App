import { Path, Svg, type SvgProps } from 'react-native-svg';

const Profile = ({ color, fill, ...props }: SvgProps) => {
  return (
    <>
      <Svg width="16" height="16" fill={fill} {...props}>
        <Path
          d="M11.5088 4C11.3863 5.65219 10.1338 7 8.75881 7C7.38381 7 6.12913 5.6525 6.00881 4C5.88381 2.28125 7.10256 1 8.75881 1C10.4151 1 11.6338 2.3125 11.5088 4Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.50007 10.5C5.78133 10.5 3.02195 12 2.51133 14.8313C2.44976 15.1725 2.64289 15.5 3.00008 15.5H14.0001C14.3576 15.5 14.5507 15.1725 14.4891 14.8313C13.9782 12 11.2188 10.5 8.50007 10.5Z"
          stroke={color}
          strokeMiterlimit="10"
        />
      </Svg>
    </>
  );
};

export default Profile;
