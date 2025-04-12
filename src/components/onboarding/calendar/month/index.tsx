import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { MonthBody } from './body';
import { MonthHeader } from './header';

type TMonthModal = {
  currentState: Date;
  isMonthModalVisisble: boolean;
  toggleMonthModal: () => void;
  toggleYearModal: () => void;
  updateMonth: (month: number) => void;
  updateYear: (year: number) => void;
};

export const MonthModal = ({
  toggleMonthModal,
  isMonthModalVisisble,
  toggleYearModal,
  currentState,
  updateMonth,
  updateYear,
}: TMonthModal) => {
  const addYear = () => {
    const newYear = currentState.getFullYear() + 1;
    updateYear(newYear);
  };

  const subtractYear = () => {
    const newYear = currentState.getFullYear() - 1;
    updateYear(newYear);
  };

  const currentYear = currentState.getFullYear();
  const currentMonth = currentState.getMonth();

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isMonthModalVisisble}
      onRequestClose={toggleMonthModal}
      testID="month-modal"
    >
      <TouchableWithoutFeedback onPress={toggleMonthModal}>
        <View className={container()}>
          <TouchableWithoutFeedback>
            <View className={wrapper()}>
              <MonthHeader
                addYear={addYear}
                year={currentYear}
                subtractYear={subtractYear}
                toggleYearModal={toggleYearModal}
              />
              <MonthBody
                updateMonth={updateMonth}
                activeMonth={currentMonth}
                toggleMonthModal={toggleMonthModal}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const monthModalStyles = tv({
  slots: {
    container: 'w-full max-w-[500px] flex-1 items-center justify-center p-5',
    wrapper: 'h-[357px] justify-evenly rounded-lg bg-white p-6',
  },
});

const { container, wrapper } = monthModalStyles();
