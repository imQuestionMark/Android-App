import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { tv } from 'tailwind-variants';

const _YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

type TYearModal = {
  currentState: Date;
  isYearModalVisisble: boolean;
  toggleYearModal: () => void;
  updateYear: (year: number) => void;
};

export const YearModal = ({
  isYearModalVisisble,
  toggleYearModal,
  updateYear,
  currentState,
}: TYearModal) => {
  const currentYear = currentState.getFullYear();
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isYearModalVisisble}
      onRequestClose={toggleYearModal}
    >
      <TouchableWithoutFeedback onPress={toggleYearModal}>
        <View className={container()}>
          <TouchableWithoutFeedback>
            <View className={innerWrapper()}>
              <FlatList
                data={_YEARS}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => {
                      updateYear(item);
                      toggleYearModal();
                    }}
                    // @TODO Setup TwMerge
                    className={button({
                      isOddButton: index % 2 === 0,
                      active: item === currentYear,
                    })}
                  >
                    <Text className={text({ active: item === currentYear })}>
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const yearModalStyles = tv({
  slots: {
    container: 'max-w-[500px] flex-1 items-stretch justify-center p-5',
    innerWrapper: 'h-[357px] items-stretch rounded-lg bg-white p-5',
    button: 'bg-white py-4',
    text: 'text-center text-base text-gray-700',
  },
  variants: {
    active: {
      true: {
        button: 'bg-blue-500',
        text: 'font-bold text-white',
      },
    },
    isOddButton: {
      true: {
        button: 'bg-[#DFE8FF] ',
      },
    },
  },
});

const { container, innerWrapper, button, text } = yearModalStyles();
