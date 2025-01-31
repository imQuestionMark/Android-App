import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { tv } from 'tailwind-variants';

const _YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

type TYearModal = {
  isYearModalVisisble: boolean;
  toggleYearModal: () => void;
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

export const YearModal = ({
  setUserSelection,
  isYearModalVisisble,
  toggleYearModal,
  userSelection,
}: TYearModal) => {
  const updateYear = (year: number) => {
    setUserSelection((prev) => ({
      ...prev,
      year,
    }));
  };

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
                  active: item === userSelection.year,
                })}
              >
                <Text className={text({ active: item === userSelection.year })}>
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
