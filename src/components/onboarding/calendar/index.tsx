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
import { MonthModal } from './month-modal';
import { YearModal } from './year-modal';

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

  const handleLeftArrowPress = (subtractMonth: () => void, date?: XDate) => {
    subtractMonth();
    if (!date) return console.error('Date object missing');
  };

  const handleRightArrowPress = (addMonth: () => void, date?: XDate) => {
    addMonth();
    if (!date) return console.error('Date object missing');
  };

  return (
    <View className="w-full max-w-[359px] rounded-lg bg-green-200">
      <RNCalendar
        hideExtraDays={true}
        markedDates={markedDates}
        current="2002-05-03"
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
        toggleYearModal={toggleYearModal}
      />

      <YearModal
        isYearModalVisisble={isYearModalVisisble}
        toggleYearModal={toggleYearModal}
        userSelection={userSelection}
        setUserSelection={setUserSelection}
      />
    </View>
  );
}
