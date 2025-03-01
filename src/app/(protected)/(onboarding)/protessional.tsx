/* eslint-disable react/jsx-no-undef */
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import GradientView from '@/components/onboarding/gradient-view';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

export default function proesstional() {
  return (
    <GradientView className="items-center justify-center px-4">
      <View className="flex h-[340px] w-[398px] items-center justify-center gap-6 rounded-3xl bg-white px-10 py-7">
        <View className="mb- h-[146px] w-[318px] items-center justify-center gap-3">
          <Image
            className="size-[78px]"
            source={require('assets/profile.png')}
          />
          <Text className="text-center font-poppins-bold text-[20px] text-[#161616]">
            Account Created🎉
          </Text>
          <Text className="font-poppins-regular text-[#929497]text-center text-[12px]">
            Need to create your wall to complete the profile
          </Text>
        </View>
        <View className="w-[318px]h-[112px] gap-2.5">
          <Button className="flex h-[51px] w-[318px] items-center justify-center ">
            <View className="flex-row items-center px-3">
              <ButtonIcon>
                <Image
                  contentFit="contain"
                  className="mr-[10px] size-6"
                  source={require('assets/Frame.png')}
                />
              </ButtonIcon>
              <ButtonText className="font-poppins-medium text-base text-[#EBEBFF]">
                Create New Resume
              </ButtonText>
            </View>
          </Button>
          <Button className=" border-1 flex h-[51px] w-[318px] border-primary bg-[#EBEBFF]">
            <View className=" flex-row items-center px-3">
              <ButtonIcon>
                <Image
                  contentFit="contain"
                  className="mr-[10px] size-6"
                  source={require('assets/upload-1.png')}
                />
              </ButtonIcon>
              <ButtonText className="font-poppins-medium text-base text-primary">
                Upload Existing Resume
              </ButtonText>
            </View>
          </Button>
        </View>
      </View>
    </GradientView>
  );
}
