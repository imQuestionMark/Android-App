import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

const _YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

type TYearModal = {
  isYearModalVisisble: boolean;
  toggleYearModal: () => void;
  updateYear: (year: number) => void;
  currentState: Date;
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
      {/* Years */}
      <View className={container()}>
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
      </View>
    </Modal>
  );
};

const yearModalStyles = tv({
  slots: {
    container: 'flex-1 items-center justify-center',
    innerWrapper: 'h-1/3 w-[82%] rounded-lg bg-green-200 p-4',
    button: 'bg-[#FFFFFF] py-4',
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
