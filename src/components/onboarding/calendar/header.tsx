import { Pressable } from 'react-native';

import { Typography } from '@/components/ui';
const XDate = require('xdate');

type THeader = {
  date: Date;
  toggleMonthModal: () => void;
};

export const CalendarHeader = ({ date, toggleMonthModal }: THeader) => {
  const formattedDate = new XDate(date);
  const title = formattedDate.toString('MMMM yyyy');
  return (
    <Pressable
      hitSlop={25}
      onPress={toggleMonthModal}
      accessibilityLabel="month-header"
    >
      <Typography
        weight={700}
        color="main"
        className="border-b text-center text-base leading-[19px] "
      >
        {title}
      </Typography>
    </Pressable>
  );
};
