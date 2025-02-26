import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { dropdownStyles } from './styles';

const { itemContainer, itemIcon, itemIconCheck, itemText } = dropdownStyles();

export const CustomItem = ({
  data,
  selected,
}: {
  data: any;
  selected?: boolean;
}) => {
  {
    return (
      <View className={itemContainer()}>
        <View className={itemIcon({ selected })}>
          <Svg width="20" fill="none" height="20" viewBox="0 0 20 20">
            <Path
              d="M6 11L9 13L14.5 7"
              strokeWidth="2.01011"
              stroke={itemIconCheck({ selected })}
            />
          </Svg>
        </View>

        <Text className={itemText({ selected })}>{data.label}</Text>
      </View>
    );
  }
};
