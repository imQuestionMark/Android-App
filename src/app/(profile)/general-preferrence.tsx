import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';

export default function GeneralPreference() {
  const router = useRouter();
  const { selected } = useLocalSearchParams(); // ✅ Retrieve selected language from params

  const [selectedLanguage, setSelectedLanguage] = useState(
    selected || 'English'
  );

  useEffect(() => {
    if (selected) {
      console.log('Updated selected language:', selected);
      setSelectedLanguage(selected);
    }
  }, [selected]);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center">
        <Typography weight={600} color="main" className="ml-3 text-[20px]">
          General Preference
        </Typography>
      </View>

      {/* Scrollable Content */}
      <KeyboardAwareScrollView contentContainerClassName="flex-grow">
        {/* Preference Items */}
        <View className="gap-4 px-[18px]">
          {[
            { title: 'Language', subtitle: selectedLanguage }, // ✅ Updated to use state
            { title: 'Content Language', subtitle: 'English' },
            { title: 'Show Profile Picture', subtitle: 'Only to My Network' },
          ].map((item, index) => (
            <View
              key={index}
              className="shadow-gray-200 relative mb-1 h-[111px] flex-row items-center justify-between rounded-[15px] bg-white px-5 py-4 shadow-lg"
            >
              <View>
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
                  console.log('Navigating to Language Selection...');
                  console.log('Current selected language:', selectedLanguage);

                  router.push({
                    pathname: '/(profile)/language-selection',
                    params: { selected: selectedLanguage },
                  });
                }}
              >
                <Image
                  source={require('assets/profile-push-arrow.svg')}
                  className="size-[24px]"
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
