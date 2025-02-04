import { Pressable, Text, View } from 'react-native';
import { type DateData } from 'react-native-calendars';
import { type BasicDayProps } from 'react-native-calendars/src/calendar/day/basic';
import { tv } from 'tailwind-variants';

type CustomDayProps = BasicDayProps & {
  date?: DateData;
};

const dayTv = tv({
  base: 'flex size-9 items-center justify-center rounded-[4px] bg-[#F2F2F5]',
  slots: {
    dayText: 'text-[#52575C]',
  },
  variants: {
    state: {
      selected: {
        base: 'bg-primary',
        dayText: 'text-white',
      },
      today: {
        base: 'bg-orange-500',
        dayText: 'text-white',
      },
      disabled: {
        base: 'bg-purple-400',
        dayText: 'text-black',
      },
      inactive: {
        base: 'bg-pink-400',
        dayText: 'text-black',
      },
      '': '',
    },
    // marking
    selected: {
      base: 'bg-primary',
    },
  },
});

const { base, dayText } = dayTv();

export const _renderDay = (props: CustomDayProps) => {
  const { state, marking, date, onPress, accessibilityLabel, testID } = props;

  const handleDayPress = () => {
    onPress && onPress(date);
  };

  return (
    <Pressable
      className={base({ state, className: marking?.selectedColor })}
      onPress={handleDayPress}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Text className={dayText({ state })}>{date?.day}</Text>
      {marking && <View className="size-2 bg-purple-800" />}
    </Pressable>
  );
};
