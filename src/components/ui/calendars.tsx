import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import * as React from 'react';
import { useState } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Modal, Pressable, TouchableWithoutFeedback, View,FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { tv } from 'tailwind-variants';

import { black } from './colors';
import { Text } from './text';

const calendarTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-2 font-poppins text-[16px] dark:text-neutral-100',
    hint: 'font-poppins text-[12px] font-medium leading-[14px] tracking-[0.5px]',
    input: 'h-[50px]  rounded-[6px] bg-white opacity-100',
    error: '',
  },
});

type TRule<T extends FieldValues> = Omit<
  RegisterOptions<T>,
  'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
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
 
}

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

const _YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const _THEME = {
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
};

export function ControlledCalendar<T extends FieldValues>(
  props: ControlledCalendarProps<T>
) {
  const { name, control, rules, hint, markedDates } = props;
  const { field, fieldState } = useController({ control, name, rules });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [currentDate, setCurrentDate] = useState({ year: 2025,month: 1,});
  const handleMonthYearChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setModalVisible(false);
    setModalVisible1(false);
    const newDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    field.onChange(newDate);
  };

  // Years
  
  const getYears = () => {
    setModalVisible1(true); 
  };
  const selectYear = (year : number) => {
    setSelectedYear(year);
    setModalVisible1(false); 
  };

  const customMarkedDates = React.useMemo(() => {
    const marked = markedDates || {};
    if (field.value) {
      marked[field.value] = {
        selected: true,
        selectedColor: '#007BFF',
        selectedTextColor: 'white',
      };
    }
    return marked;
  }, [field.value, markedDates]);

  return (
    // @TODO Add shadow
    <View className="w-full max-w-[359px] rounded-lg bg-green-200">
      <Calendar
        current={`${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`}
        onDayPress={(day: { dateString: any }) =>
          field.onChange(day.dateString)
        }
        hideExtraDays={true}
        markedDates={customMarkedDates}
        theme={_THEME}
        renderHeader={() => (
          <CalendarHeader
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setModalVisible={setModalVisible}
          />
        )}
        hideExtraDays
        dayComponent={(data) => {
          console.log(data);
          return (
            <Pressable className="flex size-9 items-center justify-center bg-[#F2F2F5]">
              <Text>{data.date.day}</Text>
            </Pressable>
          );
        }}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 items-center justify-center ">
            <TouchableWithoutFeedback>
              <View className="w-11/12 max-w-md rounded-lg bg-white p-6">
                {/* Header */}
                <View className="mb-4 flex-row items-center justify-between">
                  <Pressable
                    onPress={() => setSelectedYear(selectedYear - 1)}
                    className="rounded-md bg-gray-200 p-2"
                  >
                    <ArrowLeft color={black} />
                  </Pressable>
                  <Pressable 
                  onPress={getYears}
                  >
                  <Text className="mx-4 text-lg font-semibold text-gray-700">
                    {selectedYear}
                  </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setSelectedYear(selectedYear + 1)}
                    className="rounded-[6px] bg-[#F2F2F5] p-2 "
                  >
                    <ArrowRight color={black} />
                  </Pressable>
                </View>

                {/* Months */}
                <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-6">
                  {_MONTHS.map((month, index) => (
                    <Pressable
                      key={index}
                      onPress={() => handleMonthYearChange(selectedYear, index)}
                      className={`min-w-[100px] rounded-md font-poppins ${
                        index === selectedMonth
                          ? 'bg-[#0466c8] '
                          : 'bg-transparent'
                      }`}
                    >
                      <Text
                        className={`text-center font-poppins text-[14px] font-normal leading-[35.2px] ${
                          index === selectedMonth
                            ? 'text-white'
                            : 'text-gray-700'
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

      <Modal
      visible={modalVisible1}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible1(false)}>
        {/* Years */}
        <View className="flex-1 justify-center items-center">
        <View className="w-[82%] h-1/3 bg-white rounded-lg p-4">
                <FlatList
                data={_YEARS}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item ,index}) => (
              <Pressable
                onPress={() => selectYear(item)}
                className={`py-4 ${
                  item === selectedYear ? "bg-blue-500" : index % 2 === 0 ? "bg-[#DFE8FF]" : "bg-[#FFFFFF]"
                }`}
               >
                <Text className={`text-center text-[15px] ${item === selectedYear ? "text-white font-bold"
                 : "text-gray-700"}`}>{item}</Text>
              </Pressable>
            )}
            />
                
              </View></View>
      </Modal>

      {hint && !fieldState.error && (
        <Text className="mt-2 text-sm text-gray-500">{hint}</Text>
      )}

      {fieldState.error && (
        <Text className="mt-2 text-sm text-red-500">
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
}

const CalendarHeader = ({ setModalVisible, selectedMonth, selectedYear }) => {
  return (
    <Pressable onPress={() => setModalVisible(true)} hitSlop={25}>
      <Text className="border-b text-center font-poppins text-base font-bold leading-[19px]  text-[#161616] ">
        {_MONTHS[selectedMonth]} {selectedYear}
      </Text>
    </Pressable>
  );
};



const MonthModal = () => {};
