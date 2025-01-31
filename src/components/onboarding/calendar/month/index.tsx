import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { MonthBody } from './body';
import { MonthHeader } from './header';

type TMonthModal = {
  toggleMonthModal: () => void;
  toggleYearModal: () => void;
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
};

export const MonthModal = ({
  toggleMonthModal,
  isMonthModalVisisble,
  userSelection,
  setUserSelection,
  toggleYearModal,
}: TMonthModal) => {
  const addYear = () => setUserSelection((p) => ({ ...p, year: p.year + 1 }));

  const subtractYear = () =>
    setUserSelection((p) => ({ ...p, year: p.year - 1 }));

  const updateMonth = (month: number) =>
    setUserSelection((p) => ({ ...p, month }));

  return (
    <Modal
      visible={isMonthModalVisisble}
      transparent
      animationType="fade"
      onRequestClose={toggleMonthModal}
    >
      <TouchableWithoutFeedback onPress={toggleMonthModal}>
        <View className={container()}>
          <TouchableWithoutFeedback>
            <View className={wrapper()}>
              <MonthHeader
                addYear={addYear}
                subtractYear={subtractYear}
                toggleYearModal={toggleYearModal}
                year={userSelection.year}
              />
              <MonthBody
                updateMonth={updateMonth}
                activeMonth={userSelection.month}
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
    container: 'flex-1 items-center justify-center',
    wrapper: 'w-11/12 max-w-md rounded-lg bg-red-200 p-6',
  },
});

const { container, wrapper } = monthModalStyles();
