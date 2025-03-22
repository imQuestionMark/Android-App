import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';

export default function NotificationJobAlerts() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      {/* Header */}
      <View className="mb-[25px] flex-row items-center">
        <Typography weight={600} color="main" className="ml-3 text-[20px]">
          Job Alert
        </Typography>
      </View>
      <View className="mb-[42px] px-[18px]">
        <Typography weight={400} color="main" className="text-[18px]">
          These are notifications that newly posted jobs match with your
          profile.
        </Typography>
      </View>

      <KeyboardAwareScrollView contentContainerClassName="flex-grow gap-[16px]">
        <View className="shadow-gray-200 relative flex-row rounded-[15px] bg-white  px-[24px] py-[20px]  shadow-lg">
          <Typography weight={600} color="main" className="text-[18px]">
            New Job Alerts
          </Typography>
        </View>
        <View className="shadow-gray-200 relative flex-row rounded-[15px] bg-white  px-[24px] py-[20px]  shadow-lg">
          <Typography weight={600} color="main" className="text-[18px]">
            Job Recommendation
          </Typography>
        </View>
        <View className="shadow-gray-200 relative flex-row rounded-[15px] bg-white  px-[24px] py-[20px]  shadow-lg">
          <Typography weight={600} color="main" className="text-[18px]">
            Job Application updates
          </Typography>
        </View>
      </KeyboardAwareScrollView>

      {/* Save Button */}
      <View className="items-center pb-6">
        <Button className="w-[223px]">
          <ButtonText>Save</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
