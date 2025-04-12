import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';

export default function DataPrivacy() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center">
        <Typography weight={600} color="main" className="ml-3 text-[20px]">
          Data Privacy
        </Typography>
      </View>

      <KeyboardAwareScrollView contentContainerClassName="flex-grow">
        <View className="gap-4 px-[18px]">
          {[
            {
              title: 'Profile Photo',
              subtitle: 'Select who can see your profile photo',
            },
            {
              title: 'Posts, Articles, Events',
              subtitle:
                'Select who can see your and react to your posts, articles, events',
            },
          ].map((item, index) => (
            <View
              key={index}
              className="shadow-gray-200 relative mb-1 h-[111px] flex-row items-center justify-between rounded-[15px] bg-white px-5 py-4 shadow-lg"
            >
              <View className="flex-1">
                <Typography weight={600} color="main" className="text-[16px]">
                  {item.title}
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  {item.subtitle}
                </Typography>
              </View>

              <Button
                variant="icon"
                onPress={() => {
                  console.log('Navigating ...');

                  router.push({
                    pathname: '/(protected)/(profile)/language-selection',
                  });
                }}
              >
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={24}
                  color="gray"
                />
              </Button>
            </View>
          ))}
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
