/* eslint-disable max-lines-per-function */
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import * as React from 'react';
import { useState } from 'react';
import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { Calendar as RNCalendar, type DateData } from 'react-native-calendars';
import { type BasicDayProps } from 'react-native-calendars/src/calendar/day/basic';
import { type MarkedDates } from 'react-native-calendars/src/types';
import { tv } from 'tailwind-variants';
import type XDate from 'xdate';

import { black } from './colors';
import { Text } from './text';

const _MARKED_DATES = {
  '2025-01-01': { selected: true, marked: true, selectedColor: 'bg-red-500' },
  '2025-01-17': { marked: true },
  '2025-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
  '2025-01-19': { disabled: true, disableTouchEvent: true },
};

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

const _YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

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

export function ControlledCalendar() {
  const [markedDates, setMarkedDates] = useState<MarkedDates>(_MARKED_DATES);

  return (
    <>
      <Calendar markedDates={markedDates} setMarkedDates={setMarkedDates} />
    </>
  );
}

type TCalendar = {
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
};

function Calendar({ markedDates, setMarkedDates }: TCalendar) {
  const [isMonthModalVisisble, setIsMonthModalVisible] = useState(false);
  const [isYearModalVisisble, setIsYearModalVisible] = useState(false);
  const [userSelection, setUserSelection] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const toggleMonthModal = () => setIsMonthModalVisible((prev) => !prev);
  const toggleYearModal = () => setIsYearModalVisible((prev) => !prev);

  const handleDayPress = ({ dateString }: DateData) => {
    const newMarkedDate: MarkedDates = {
      [dateString]: { selected: true, selectedColor: 'bg-purple-500' },
    };
    setMarkedDates({
      ...markedDates,
      ...newMarkedDate,
    });
  };

  const handleLeftArrowPress = (subtractMonth: () => void) => {
    subtractMonth();
  };

  const handleRightArrowPress = (addMonth: () => void) => {
    addMonth();
  };

  return (
    <View className="w-full max-w-[359px] rounded-lg bg-green-200">
      <RNCalendar
        hideExtraDays={true}
        markedDates={markedDates}
        enableSwipeMonths
        renderHeader={(date?: XDate) => (
          <CalendarHeader date={date} toggleMonthModal={toggleMonthModal} />
        )}
        onPressArrowLeft={handleLeftArrowPress}
        onPressArrowRight={handleRightArrowPress}
        onDayPress={handleDayPress}
        renderArrow={(direction: string) => _renderArrows(direction)}
        dayComponent={(data) => _renderDay(data)}
      />

      <MonthModal
        isMonthModalVisisble={isMonthModalVisisble}
        toggleMonthModal={toggleMonthModal}
        userSelection={userSelection}
        setUserSelection={setUserSelection}
      />

      <YearModal
        yearModal={toggleYearModal}
        selectedYear={userSelection.year}
      />
    </View>
  );
}

const CalendarHeader = ({
  date,
  toggleMonthModal,
}: {
  date?: XDate;
  toggleMonthModal: () => void;
}) => {
  const title = date?.toString('MMMM yyyy');
  // console.log('Header props', title);
  return (
    <Pressable onPress={toggleMonthModal} hitSlop={25}>
      <Text className="border-b text-center font-poppins text-base font-bold leading-[19px]  text-[#161616] ">
        {title}
      </Text>
    </Pressable>
  );
};

const _renderArrows = (direction: string) => {
  return direction === 'left' ? (
    <ArrowLeft color={black} />
  ) : (
    <ArrowRight color={black} />
  );
};

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

const _renderDay = (props: CustomDayProps) => {
  const { state, marking, date, onPress, accessibilityLabel, testID } = props;

  const handleDayPress = () => {
    onPress && onPress(date);
  };

  // if (marking !== undefined) console.log(marking);

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

const MonthModal = ({
  toggleMonthModal,
  isMonthModalVisisble,
  userSelection,
  setUserSelection,
}: {
  toggleMonthModal: () => void;
  isMonthModalVisisble: boolean;
  userSelection: {
    month: number;
    year: number;
  };
  setUserSelection: React.Dispatch<
    React.SetStateAction<{
      month: number;
      year: number;
    }>
  >;
}) => {
  return (
    <Modal
      visible={isMonthModalVisisble}
      transparent
      animationType="fade"
      onRequestClose={toggleMonthModal}
    >
      <TouchableWithoutFeedback onPress={toggleMonthModal}>
        <View className="flex-1 items-center justify-center ">
          <TouchableWithoutFeedback>
            <View className="w-11/12 max-w-md rounded-lg bg-red-200 p-6">
              {/* Header */}
              <View className="mb-4 flex-row items-center justify-between">
                <Pressable
                  onPress={() =>
                    setUserSelection((prev) => ({
                      ...prev,
                      year: prev.year - 1,
                    }))
                  }
                  className="rounded-md bg-gray-200 p-2"
                >
                  <ArrowLeft color={black} />
                </Pressable>
                <Pressable
                // onPress={getYears}
                >
                  <Text className="mx-4 text-lg font-semibold text-gray-700">
                    {userSelection.year}
                  </Text>
                </Pressable>
                <Pressable
                  // onPress={() => setSelectedYear(selectedYear + 1)}
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
                    // onPress={() => handleMonthYearChange(selectedYear, index)}
                    className={`min-w-[100px] rounded-md font-poppins ${
                      index === 0 ? 'bg-[#0466c8] ' : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-center font-poppins text-[14px] font-normal leading-[35.2px] ${
                        index === 0 ? 'text-white' : 'text-gray-700'
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
  );
};

const YearModal = ({ setYearModal, yearModal, selectedYear, selectYear }) => {
  return (
    <Modal
      visible={yearModal}
      transparent
      animationType="fade"
      onRequestClose={() => setYearModal(false)}
    >
      {/* Years */}
      <View className="flex-1 items-center justify-center">
        <View className="h-1/3 w-[82%] rounded-lg bg-green-200 p-4">
          <FlatList
            data={_YEARS}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => selectYear(item)}
                className={`py-4 ${
                  item === selectedYear
                    ? 'bg-blue-500'
                    : index % 2 === 0
                      ? 'bg-[#DFE8FF]'
                      : 'bg-[#FFFFFF]'
                }`}
              >
                <Text
                  className={`text-center text-[15px] ${
                    item === selectedYear
                      ? 'font-bold text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};
