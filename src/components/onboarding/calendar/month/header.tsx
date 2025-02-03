import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { black } from '@/components/ui/colors';

type TMonthHeader = {
  year: number;
  subtractYear: () => void;
  addYear: () => void;
  toggleYearModal: () => void;
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
        <ArrowLeft color={black} />
      </Pressable>

      <Pressable
        onPress={() => {
          console.log('Log on Press year modal');
          toggleYearModal();
        }}
        hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
      >
        <Text className={yearText()}>{year}</Text>
      </Pressable>

      <Pressable onPress={addYear} className={arrowbutton()}>
        <ArrowRight color={black} />
      </Pressable>
    </View>
  );
};

const monthHeaderStyles = tv({
  slots: {
    container: 'mb-4 flex-row items-center justify-between',
    arrowbutton: 'rounded-md bg-gray-200 p-2',
    yearText: 'mx-4 text-lg font-semibold text-gray-700',
  },
});

const { container, arrowbutton, yearText } = monthHeaderStyles();
