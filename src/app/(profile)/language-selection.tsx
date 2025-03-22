import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Hindi',
  'Mandarin',
  'Arabic',
  'Japanese',
  'Portuguese',
];

export default function LanguageSelection() {
  const router = useRouter();
  const { selected } = useLocalSearchParams();

  const [selectedLanguage, setSelectedLanguage] = useState(selected || '');

  return (
    <SafeAreaView className="flex-1 bg-white px-[16px] pt-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center p-[16px]">
        <Typography color="main" weight={600} className="ml-3 text-[20px]">
          Language
        </Typography>
      </View>

      {/* Title & Divider */}
      <View className="p-[16px]">
        <Typography weight={700} className="mb-[16px] text-[22px]">
          Please select
        </Typography>
        <View className="mb-[16px] w-full self-center border-b border-[#979AA0]" />
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        contentContainerClassName="gap-[20px] p-[16px]"
        renderItem={({ item }) => (
          <Button
            variant="ghost"
            onPress={() => setSelectedLanguage(item)}
            className="gap-x-4"
          >
            <ButtonText
              weight={selectedLanguage === item ? 700 : 600}
              className={`text-left text-[20px] ${
                selectedLanguage === item ? 'text-primary' : 'text-black'
              }`}
            >
              {item}
            </ButtonText>
            {selectedLanguage === item && <Check size={20} color="#0400D1" />}
          </Button>
        )}
      />

      {/* Save Button */}
      <View className="items-center pb-6 pt-4">
        <Button
          className="w-[223px]"
          disabled={!selectedLanguage}
          onPress={async () => {
            console.log(' Navigating to Language Selection...');
            console.log(' Current selected language:', selectedLanguage);

            router.replace({
              pathname: '/(profile)/general-preferrence',
              params: { selected: selectedLanguage },
            });
          }}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
