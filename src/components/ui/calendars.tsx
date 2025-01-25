import * as React from 'react';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { View ,Button, Pressable, Modal, TouchableWithoutFeedback} from 'react-native';
import { Calendar } from "react-native-calendars";
import { tv } from 'tailwind-variants';
import { Text } from './text';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { black } from './colors';

const calendarTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-2 font-[Poppins] text-[16px] dark:text-neutral-100',
    hint: 'font-[Poppins] text-[12px] font-medium leading-[14px] tracking-[0.5px]',
    input: 'h-[50px]  rounded-[6px] bg-white opacity-100',
    error: '',
  },
});

type DateCallbackHandler = (date: {
  dateString: string;
  day: number;
  month: number;
  year: number;
}) => void;

type TRule<T extends FieldValues> = Omit<
  RegisterOptions<T>,
  "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type CalendarControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledCalendarProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
  label?: string;
  hint?: string;
  error?: string;
  selectedDate?: string;
  markedDates?: Record<string, any>;
  onSubmit?: () => void;
  onBack?: () => void;
}

export function ControlledCalendar<T extends FieldValues>(
  props: ControlledCalendarProps<T>
) {
  const { name, control, rules, label, hint, markedDates, onSubmit,onBack, ...calendarProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  
  const handleMonthYearChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setModalVisible(false);
    const newDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    field.onChange(newDate);
  };

  const customMarkedDates = React.useMemo(() => {
    const marked = markedDates || {};
    if (field.value) {
      marked[field.value] = {
        selected: true,
        selectedColor: "#007BFF",
        selectedTextColor: "white",
      };
    }
    return marked;
  }, [field.value, markedDates]);

  const styles = calendarTv();

  return (
    <View className="p-4 bg-white rounded-lg shadow-md">
   
      {label && <Text className="text-gray-700 text-[16px] font-bold mb-2">{label}</Text>}

      
      <Calendar
       current={`${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-01`}
        onDayPress={(day: { dateString: any }) => field.onChange(day.dateString)}
        markedDates={customMarkedDates}
        theme={{
          calendarBackground: 'white',
          selectedDayBackgroundColor: '#007BFF',
          selectedDayTextColor: 'white',
          todayTextColor: '#007BFF',
          dayTextColor: '#374151',
          textDisabledColor: '#D1D5DB',
          textDayFontFamily: 'Poppins-Regular',
          textMonthFontFamily: 'Poppins-SemiBold',
          textDayHeaderFontFamily: 'Poppins-Medium',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}

        
        renderHeader={() => (
          <Pressable onPress={() => setModalVisible(true)}>
           <Text className="text-center text-[#161616] leading-[35.2px] text-[16px] font-bold font-Lato underline">
              {months[selectedMonth]} {selectedYear}
            </Text>
          </Pressable>
        )}
      />

<Modal
  visible={modalVisible}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
<View className="ml-5 flex-1  justify-center items-center">
<TouchableWithoutFeedback onPress={() => {}}>
  <View className="bg-white p-4 rounded-lg w-11/12 max-w-md">
   <View className="flex-row justify-between items-center mb-4">
    <Pressable
    onPress={() => setSelectedYear(selectedYear - 1)}
    className="p-2 bg-gray-200 rounded-md"
  >
    <ArrowLeft color={black}/>
  </Pressable>
      <Text className="text-lg font-semibold text-gray-700 mx-4">
        {selectedYear}
      </Text>
      <Pressable
        onPress={() => setSelectedYear(selectedYear + 1)}
        className="p-2 bg-[#F2F2F5] rounded-[6px] "
      >
        <ArrowRight color={black}/>
      </Pressable>
    </View>
    <View className="flex-wrap flex-row justify-center gap-[16px]">
      {months.map((month, index) => (
        <Pressable
          key={index}
          onPress={() => handleMonthYearChange(selectedYear, index)}
          className={`min-w-[100px] font-Lato rounded-[6px] ${
            index === selectedMonth ? "bg-[#0466c8] bg-opacity-20" : "bg-transparent"
          }`}
        >
          <Text
            className={`text-center font-Lato text-[14px] leading-[35.2px] font-normal ${
              index === selectedMonth ? "text-white" : "text-gray-700"
            }`}
          >
            {month}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
  </TouchableWithoutFeedback>
</View>


</TouchableWithoutFeedback>
    
    
</Modal>
  {hint && !fieldState.error && <Text className="text-gray-500 text-sm mt-2">{hint}</Text>}
      {fieldState.error && (
        <Text className="text-red-500 text-sm mt-2">{fieldState.error.message}</Text>
      )}

      <View className="flex-row justify-between mt-4">
        <Pressable
          onPress={onBack}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex-1 mr-2"
        >
          <Text className="text-gray-700 text-center font-medium">Back</Text>
        </Pressable>
        <Pressable
          onPress={onSubmit}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex-1 ml-2"
        >
          <Text className="text-gray-700 text-center font-medium">Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
