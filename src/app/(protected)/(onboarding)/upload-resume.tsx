import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CirclePause, CircleX } from 'lucide-react-native';

export default function UploadResume() {
  return (
    <SafeAreaView className="grow gap-6 bg-white p-3">
      <View className="items-center px-[35px]">
        <Image
          className="h-[301px] w-[360px]"
          source={require('assets/resume.png')}
        />
      </View>

      <View className="justify-center gap-[2px]">
        <Typography
          weight={700}
          className=" text-[18px] leading-[26px] text-main"
        >
          Upload Existing Resume
        </Typography>
        <Typography className="text-[14px] leading-[16px] text-[#929497]">
          Add your resume here, and you can upload up to 5 MB max
        </Typography>
      </View>

      <View className="items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#1849D6] p-6">
        <Image className="size-[42px]" source={require('assets/upload.png')} />

        <View className="gap-2">
          <Typography className="items-center justify-center text-center text-[14px]">
            Drag your file(s) to start uploading
          </Typography>

          <View className="flex-row items-center justify-center">
            <View className="h-[1px] w-20 bg-[#E7E7E7]" />
            <Typography className="mx-1 text-xs text-[#6D6D6D]">OR</Typography>
            <View className="h-[1px] w-20 bg-[#E7E7E7]" />
          </View>

          <View className="items-center">
            <Button variant="outline" className="px-3 py-[6px]">
              <ButtonText weight={600} color="primary" className="text-[12px]">
                Browse files
              </ButtonText>
            </Button>
          </View>
        </View>
      </View>

      <View className="border border-[#E7E7E7] rounded-xl p-4 gap-2">
        <View className="flex-row items-center">
          <View className="grow">
            <Typography
              weight={600}
              className="text-[14px] leading-[26px] text-main"
            >
              Uploading...
            </Typography>
            <View className="flex-row gap-2">
              <Typography className="text-[14px] leading-[26px] text-main">
                65%
              </Typography>
              <Typography className="text-[14px] leading-[26px] text-main">
                •
              </Typography>
              <Typography className="text-[14px] leading-[26px] text-main">
                30 seconds remaining
              </Typography>
            </View>
          </View>

          <View className="flex-row gap-1">
            <Button variant="ghost" size="icon" className="size-[24px]">
              <ButtonIcon>
                <CirclePause size={20} color="gray" />
              </ButtonIcon>
            </Button>

            <Button variant="ghost" size="icon" className="size-[24px]">
              <ButtonIcon>
                <CircleX size={20} color="red" />
              </ButtonIcon>
            </Button>
          </View>
        </View>

        <View>
          <View className="h-3 rounded-xl bg-body/10 " />
          <View className="h-3 w-3/4  rounded-xl bg-primary absolute" />
        </View>
      </View>
    </SafeAreaView>
  );
}
