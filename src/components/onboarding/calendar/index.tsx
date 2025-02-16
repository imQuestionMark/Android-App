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
import { YearModal } from './year';

const _MARKED_DATES = {
  '2025-01-01': { selected: true, marked: true, selectedColor: 'bg-red-500' },
  '2025-01-17': { marked: true },
  '2025-01-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
  '2025-01-19': { disabled: true, disableTouchEvent: true },
};

export function ControlledCalendar() {
  const [markedDates, setMarkedDates] = useState<MarkedDates>(_MARKED_DATES);

  return <Calendar markedDates={markedDates} setMarkedDates={setMarkedDates} />;
}

type TCalendar = {
  markedDates: MarkedDates;
  setMarkedDates: React.Dispatch<React.SetStateAction<MarkedDates>>;
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

  const currentDateString = `${currentState.getFullYear()}-${String(currentState.getMonth() + 1).padStart(2, '0')}-${String(currentState.getDate()).padStart(2, '0')}`;

  return (
    <View
      className="w-full rounded-lg p-5"
      onLayout={(e) => console.log(e.nativeEvent.layout.height)}
    >
      <RNCalendar
        hideExtraDays
        enableSwipeMonths
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={{ borderRadius: 6 }}
        initialDate={currentDateString}
        onPressArrowLeft={handleLeftArrowPress}
        dayComponent={(data) => _renderDay(data)}
        onPressArrowRight={handleRightArrowPress}
        onVisibleMonthsChange={handleMonthChange}
        renderArrow={(direction: string) => _renderArrows(direction)}
        renderHeader={() => (
          <CalendarHeader
            date={currentState}
            toggleMonthModal={toggleMonthModal}
          />
        )}
      />

      <MonthModal
        updateYear={_updateYear}
        updateMonth={_updateMonth}
        currentState={currentState}
        toggleYearModal={toggleYearModal}
        toggleMonthModal={toggleMonthModal}
        isMonthModalVisisble={isMonthModalVisisble}
      />

      <YearModal
        updateYear={_updateYear}
        currentState={currentState}
        toggleYearModal={toggleYearModal}
        isYearModalVisisble={isYearModalVisisble}
      />
    </View>
  );
}
