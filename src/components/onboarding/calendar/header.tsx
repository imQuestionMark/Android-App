import { Pressable, Text } from 'react-native';

export const CalendarHeader = ({
  date,
  toggleMonthModal,
}: {
  date?: XDate;
  toggleMonthModal: () => void;
}) => {
  const title = date?.toString('MMMM yyyy');
  return (
    <Pressable onPress={toggleMonthModal} hitSlop={25}>
      <Text className="border-b text-center font-poppins text-base font-bold leading-[19px] text-[#161616] ">
        {title}
      </Text>
    </Pressable>
  );
};
