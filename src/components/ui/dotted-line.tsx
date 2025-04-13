import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

export const DottedLine = ({ className = 'my-4' }: { className?: string }) => {
  return (
    <View className={className}>
      <Svg height="2" width="100%">
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#838383"
          strokeWidth="2"
          strokeDasharray="6, 3"
        />
      </Svg>
    </View>
  );
};
