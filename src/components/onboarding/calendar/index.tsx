import { useState } from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import {
  type DateData,
  type MarkedDates,
} from 'react-native-calendars/src/types';
import type XDate from 'xdate';

import { _renderArrows } from './arrows';
import { _renderDay } from './day';
import { CalendarHeader } from './header';
import { MonthModal } from './month';

const _MARKED_DATES = {
  '2025-01-01': { selected: true, marked: true, selectedColor: 'bg-red-500' },
  '2025-01-17': { marked: true },
  '2025-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
  '2025-01-19': { disabled: true, disableTouchEvent: true },
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

type TUserSelection = {
  day: number;
  month: number;
  year: number;
};

const today = new Date('2022-08-03');

function Calendar({ markedDates, setMarkedDates }: TCalendar) {
  const [isMonthModalVisisble, setIsMonthModalVisible] = useState(false);
  const [isYearModalVisisble, setIsYearModalVisible] = useState(false);
  const [currentState, setCurrentState] = useState(today);

  const toggleMonthModal = () => setIsMonthModalVisible((p) => !p);
  const toggleYearModal = () => setIsYearModalVisible((p) => !p);

  const _updateMonth = (month: number) => {
    if (month < 0 || month > 11) throw new Error('Invalid month');

    const newMonth = new Date(new Date(currentState).setMonth(month));
    console.log('Updating month', newMonth);
    setCurrentState(newMonth);
  };

  const _updateYear = (year: number) => {
    const newYear = new Date(new Date(currentState).setFullYear(year));
    setCurrentState(newYear);
    console.log('Updating year', newYear);
  };

  const handleDayPress = ({ dateString }: DateData) => {
    const newMarkedDate: MarkedDates = {
      [dateString]: { selected: true, selectedColor: 'bg-purple-500' },
    };
    console.log('Handle Day Press', new Date(dateString));
    setCurrentState(new Date(dateString));
    setMarkedDates({
      ...markedDates,
      ...newMarkedDate,
    });
  };

  // @TODO Sync modal data in this method.
  const handleLeftArrowPress = (subtractMonth: () => void, date?: XDate) => {
    subtractMonth();
    if (!date) return console.error('Date object missing');
  };

  // @TODO Sync modal data in this method.
  const handleRightArrowPress = (addMonth: () => void, date?: XDate) => {
    addMonth();
    if (!date) return console.error('Date object missing');
  };

  const handleMonthChange = (data: DateData[]) => {
    const dateString = data[0].dateString;
    setCurrentState(new Date(dateString));
  };

  return (
    <View className="w-full max-w-[359px] rounded-lg bg-green-200">
      <RNCalendar
        onVisibleMonthsChange={handleMonthChange}
        hideExtraDays
        enableSwipeMonths
        current={`${currentState.getFullYear()}-${currentState.getMonth()}-${currentState.getDate()}`}
        markedDates={markedDates}
        onPressArrowLeft={handleLeftArrowPress}
        onPressArrowRight={handleRightArrowPress}
        onDayPress={handleDayPress}
        renderHeader={(date?: XDate) => (
          <CalendarHeader
            date={currentState}
            toggleMonthModal={toggleMonthModal}
          />
        )}
        renderArrow={(direction: string) => _renderArrows(direction)}
        dayComponent={(data) => _renderDay(data)}
      />

      <MonthModal
        isMonthModalVisisble={isMonthModalVisisble}
        toggleMonthModal={toggleMonthModal}
        toggleYearModal={toggleYearModal}
        currentState={currentState}
        updateMonth={_updateMonth}
        updateYear={_updateYear}
      />

      {/* <YearModal
        isYearModalVisisble={isYearModalVisisble}
        toggleYearModal={toggleYearModal}
      /> */}
    </View>
  );
}
