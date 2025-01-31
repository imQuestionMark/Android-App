import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { black } from '@/components/ui/colors';

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

const _MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MonthModal = ({
  toggleMonthModal,
  isMonthModalVisisble,
  userSelection,
  setUserSelection,
  toggleYearModal,
}: TMonthModal) => {
  return (
    <Modal
      visible={isMonthModalVisisble}
      transparent
      animationType="fade"
      onRequestClose={toggleMonthModal}
    >
      <TouchableWithoutFeedback onPress={toggleMonthModal}>
        <View className="flex-1 items-center justify-center ">
          <TouchableWithoutFeedback>
            <View className="w-11/12 max-w-md rounded-lg bg-red-200 p-6">
              {/* Header */}
              <View className="mb-4 flex-row items-center justify-between">
                <Pressable
                  onPress={() =>
                    setUserSelection((prev) => ({
                      ...prev,
                      year: prev.year - 1,
                    }))
                  }
                  className="rounded-md bg-gray-200 p-2"
                >
                  <ArrowLeft color={black} />
                </Pressable>
                <Pressable onPress={toggleYearModal}>
                  <Text className="mx-4 text-lg font-semibold text-gray-700">
                    {userSelection.year}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    setUserSelection((prev) => ({
                      ...prev,
                      year: prev.year + 1,
                    }))
                  }
                  className="rounded-[6px] bg-[#F2F2F5] p-2 "
                >
                  <ArrowRight color={black} />
                </Pressable>
              </View>

              {/* Months */}
              <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-6">
                {_MONTHS.map((month, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      setUserSelection((prev) => ({
                        ...prev,
                        month: index,
                      }))
                    }
                    className={`min-w-[100px] rounded-md font-poppins ${
                      index === userSelection.month
                        ? 'bg-[#0466c8] '
                        : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-center font-poppins text-[14px] font-normal leading-[35.2px] ${
                        index === userSelection.month
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {month}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
