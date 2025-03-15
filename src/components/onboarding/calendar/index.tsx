import { useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import {
  type DateData,
  type MarkedDates,
} from 'react-native-calendars/src/types';

import { type PersonalDetailsProps } from '@/app/(authentication)/(onboarding)/personal-details';
import { usePersonalStore } from '@/lib/store/personal-details';

import { _renderArrows } from './arrows';
import { _renderDay } from './day';
import { CalendarHeader } from './header';
import { MonthModal } from './month';
import { YearModal } from './year';

const _MARKED_DATES = {
  // '2025-01-01': { selectedColor: 'bg-red-500' },
};

type TCalendar = {
  control: Control<PersonalDetailsProps>;
  hideCalendarModal: () => void;
};

const today = new Date();

export function ControlledCalendar({ control, hideCalendarModal }: TCalendar) {
  const [isMonthModalVisisble, setIsMonthModalVisible] = useState(false);
  const [isYearModalVisisble, setIsYearModalVisible] = useState(false);
  const { field } = useController({ control, name: 'DOB' });
  const [userSelection, setUserSelection] = useState(today);
  const { updateDOB } = usePersonalStore();

  const toggleMonthModal = () => setIsMonthModalVisible((p) => !p);
  const toggleYearModal = () => setIsYearModalVisible((p) => !p);

  const _updateMonth = (month: number) => {
    if (month < 0 || month > 11) throw new Error('Invalid month');

    const newMonth = new Date(new Date(userSelection).setMonth(month));
    console.log('Updating month', newMonth);
    setUserSelection(newMonth);
  };

  const _updateYear = (year: number) => {
    const newYear = new Date(new Date(userSelection).setFullYear(year));
    setUserSelection(newYear);
    console.log('Updating year', newYear);
  };

  const handleDayPress = ({ dateString }: DateData) => {
    const newMarkedDate: MarkedDates = {
      [dateString]: { selected: true, selectedColor: 'bg-primary' },
    };
    console.log('Marked date', newMarkedDate);
    console.log('Handle Day Press', new Date(dateString));
    console.log('String format', dateString);
    setUserSelection(new Date(dateString));
    field.onChange(dateString);
    updateDOB(dateString);

    hideCalendarModal();
  };

  // const handleLeftArrowPress = (subtractMonth: () => void, date?: XDate) => {
  //   subtractMonth();
  //   if (!date) return console.error('Date object missing');
  // };

  // const handleRightArrowPress = (addMonth: () => void, date?: XDate) => {
  //   addMonth();
  //   if (!date) return console.error('Date object missing');
  // };

  const handleMonthChange = (data: DateData[]) => {
    const dateString = data[0].dateString;
    setUserSelection(new Date(dateString));
  };

  const currentDateString = `${userSelection.getFullYear()}-${String(userSelection.getMonth() + 1).padStart(2, '0')}-${String(userSelection.getDate()).padStart(2, '0')}`;

  return (
    <View
      className="w-full rounded-lg p-5"
      onLayout={(e) => console.log(e.nativeEvent.layout.height)}
    >
      <RNCalendar
        hideExtraDays
        enableSwipeMonths
        onDayPress={handleDayPress}
        style={{ borderRadius: 6 }}
        initialDate={currentDateString}
        dayComponent={(data) => _renderDay(data)}
        // onPressArrowLeft={handleLeftArrowPress}
        // onPressArrowRight={handleRightArrowPress}
        onVisibleMonthsChange={handleMonthChange}
        renderArrow={(direction: string) => _renderArrows(direction)}
        renderHeader={() => (
          <CalendarHeader
            date={userSelection}
            toggleMonthModal={toggleMonthModal}
          />
        )}
      />

      <MonthModal
        updateYear={_updateYear}
        updateMonth={_updateMonth}
        currentState={userSelection}
        toggleYearModal={toggleYearModal}
        toggleMonthModal={toggleMonthModal}
        isMonthModalVisisble={isMonthModalVisisble}
      />

      <YearModal
        updateYear={_updateYear}
        currentState={userSelection}
        toggleYearModal={toggleYearModal}
        isYearModalVisisble={isYearModalVisisble}
      />
    </View>
  );
}
