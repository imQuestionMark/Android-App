import { Pressable, Text } from 'react-native';
const XDate = require('xdate');

type THeader = {
  date: Date;
  toggleMonthModal: () => void;
};

export const CalendarHeader = ({ date, toggleMonthModal }: THeader) => {
  const formattedDate = new XDate(date);
  const title = formattedDate.toString('MMMM yyyy');
  return (
    <Pressable onPress={toggleMonthModal} hitSlop={25}>
      <Text className="border-b text-center font-poppins text-base font-bold leading-[19px] text-[#161616] ">
        {title}
      </Text>
    </Pressable>
  );
};
