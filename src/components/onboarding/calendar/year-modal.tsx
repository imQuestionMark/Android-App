import { FlatList, Modal, Pressable, Text, View } from 'react-native';

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
  return (
    <Modal
      visible={isYearModalVisisble}
      transparent
      animationType="fade"
      onRequestClose={toggleYearModal}
    >
      {/* Years */}
      <View className="flex-1 items-center justify-center">
        <View className="h-1/3 w-[82%] rounded-lg bg-green-200 p-4">
          <FlatList
            data={_YEARS}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setUserSelection((prev) => ({
                    ...prev,
                    year: item,
                  }));
                  toggleYearModal();
                }}
                className={`py-4 ${
                  item === userSelection.year
                    ? 'bg-blue-500'
                    : index % 2 === 0
                      ? 'bg-[#DFE8FF]'
                      : 'bg-[#FFFFFF]'
                }`}
              >
                <Text
                  className={`text-center text-[15px] ${
                    item === userSelection.year
                      ? 'font-bold text-white'
                      : 'text-gray-700'
                  }`}
                >
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
