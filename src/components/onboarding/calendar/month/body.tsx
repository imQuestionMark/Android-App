import React from 'react';
import { Pressable, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Typography } from '@/components/ui';

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
          <Typography className={text({ active: idx === activeMonth })}>
            {month}
          </Typography>
        </Pressable>
      ))}
    </View>
  );
};

const monthBodyStyles = tv({
  slots: {
    container: 'flex-row flex-wrap justify-center gap-x-4 gap-y-6',
    button: 'min-w-[100px] rounded-md bg-transparent font-poppins-regular',
    text: 'text-gray-700 text-center font-poppins-regular text-[14px] font-normal leading-[35.2px]',
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
