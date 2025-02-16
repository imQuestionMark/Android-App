import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

const _MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type TMonthBody = {
  activeMonth: number;
  toggleMonthModal: () => void;
  updateMonth: (month: number) => void;
};

export const MonthBody = ({
  activeMonth,
  updateMonth,
  toggleMonthModal,
}: TMonthBody) => {
  return (
    <View className={container()}>
      {_MONTHS.map((month, idx) => (
        <Pressable
          key={idx}
          className={button({ active: idx === activeMonth })}
          onPress={() => {
            updateMonth(idx);
            toggleMonthModal();
          }}
        >
          <Text className={text({ active: idx === activeMonth })}>{month}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const monthBodyStyles = tv({
  slots: {
    container: 'flex-row flex-wrap justify-center gap-x-4 gap-y-6',
    button: 'min-w-[100px] rounded-md bg-transparent font-poppins',
    text: 'text-center font-poppins text-[14px] font-normal leading-[35.2px] text-gray-700',
  },
  variants: {
    active: {
      true: {
        button: 'bg-primary',
        text: 'text-white',
      },
    },
  },
});

const { container, button, text } = monthBodyStyles();
