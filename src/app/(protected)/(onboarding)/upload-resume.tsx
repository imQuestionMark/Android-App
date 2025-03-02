import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

import { Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export default function UploadResume() {
  return (
    <View className=" flex-1 items-center justify-center gap-6 bg-white px-6">
      <View className="w-3/4 items-center px-[35px]">
        <Image
          className="h-[301px] w-[360px]"
          source={require('assets/resume.png')}
        />
      </View>

      <View className=" h-[60px]  w-full justify-center gap-[2px]">
        <Typography
          weight-700
          className=" text-left text-lg leading-[26px] text-main"
        >
          Upload Existing Resume
        </Typography>
        <Typography className="font-poppins-regular text-sm leading-4 text-[#929497]">
          Add your resume here, and you can upload up to 5 MB max
        </Typography>
      </View>
      <View className=" h-[186px]  w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#1849D6] p-6">
        <Image className="size-[42px]" source={require('assets/upload.png')} />
        <View className="h-[84px] w-full gap-2">
          <Typography className="items-center justify-center text-center font-poppins-regular text-sm leading-5">
            Drag your file(s) to start uploading
          </Typography>
          <View className="flex-row items-center justify-center">
            <View className="h-px w-20  bg-[#E7E7E7]" />
            <Typography className="mx-1 font-poppins-regular text-xs text-[#6D6D6D]">
              {' '}
              OR{' '}
            </Typography>
            <View className="h-px w-20 bg-[#E7E7E7]" />
          </View>
          <View className="items-center justify-center">
            <Button className="h-[30px] w-24  rounded-lg border border-[#1849D6] bg-white">
              <ButtonText className="font-poppins-semibold text-xs text-[#1849D6]">
                Browse files
              </ButtonText>
            </Button>
          </View>
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
}
