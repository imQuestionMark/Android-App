import { useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import {
  type DateData,
  type MarkedDates,
} from 'react-native-calendars/src/types';
import type XDate from 'xdate';

import { type PersonalDetailsProps } from '@/app/(authentication)/personal-details';

import { _renderArrows } from './arrows';
import { _renderDay } from './day';
import { CalendarHeader } from './header';
import { MonthModal } from './month';
import { YearModal } from './year';

const _MARKED_DATES = {
  // '2025-01-01': { selectedColor: 'bg-red-500' },
};

export function ControlledCalendar({
  control,
}: {
  control: Control<PersonalDetailsProps>;
}) {
  return <Calendar control={control} />;
}

type TCalendar = {
  control: Control<PersonalDetailsProps>;
};

const today = new Date('2025-01-03');

function Calendar({ control }: TCalendar) {
  const [isMonthModalVisisble, setIsMonthModalVisible] = useState(false);
  const [isYearModalVisisble, setIsYearModalVisible] = useState(false);
  const [currentState, setCurrentState] = useState(today);
  const [markedDates, setMarkedDates] = useState<MarkedDates>(_MARKED_DATES);

  const { field } = useController({ control, name: 'DOB' });

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
      [dateString]: { selected: true, selectedColor: 'bg-primary' },
    };
    console.log('Handle Day Press', new Date(dateString));
    setCurrentState(new Date(dateString));
    field.onChange(new Date(dateString));

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
