import { View } from 'react-native';

import { Typography } from '@/components/ui';

import { dropdownStyles } from './styles';

const { itemContainer, itemText } = dropdownStyles();

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
        <Typography className={itemText({ selected })}>{data.label}</Typography>
      </View>
    );
  }
};
