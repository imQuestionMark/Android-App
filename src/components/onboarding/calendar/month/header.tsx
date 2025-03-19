import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Typography } from '@/components/ui';

type TMonthHeader = {
  addYear: () => void;
  subtractYear: () => void;
  toggleYearModal: () => void;
  year: number;
};

export const MonthHeader = ({
  year,
  subtractYear,
  addYear,
  toggleYearModal,
}: TMonthHeader) => {
  return (
    <View className={container()}>
      <Pressable onPress={subtractYear} className={arrowbutton()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <Pressable
        hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
        onPress={() => {
          console.log('Log on Press year modal');
          toggleYearModal();
        }}
      >
        <Typography className={yearText()}>{year}</Typography>
      </Pressable>

      <Pressable onPress={addYear} className={arrowbutton()}>
        <Ionicons name="arrow-forward" size={24} color="black" />{' '}
      </Pressable>
    </View>
  );
};

const monthHeaderStyles = tv({
  slots: {
    container: 'mb-4 flex-row items-center justify-between',
    arrowbutton: 'bg-gray-200 rounded-md p-2',
    yearText: 'text-gray-700 mx-4 font-poppins-semibold text-lg',
  },
});

const { container, arrowbutton, yearText } = monthHeaderStyles();
