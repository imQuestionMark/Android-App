/* eslint-disable react/jsx-no-undef */

import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import GradientView from '@/components/onboarding/gradient-view';
import { Typography } from '@/components/ui';

export default function ProfileMain() {
  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow justify-center  gap-16 px-[16px]">
        <View className="justify-between gap-3">
          <View>
            <Typography weight={600} color="main" className="text-[24px]">
              Profile
            </Typography>
          </View>
          <View className="items-center justify-center">
            <Image
              contentFit="contain"
              className="size-[100px]"
              source={require('assets/basic-profile.svg')}
            />
          </View>
          <View className="items-center">
            <Typography weight={600} color="main" className="text-[24px]">
              Andrew
            </Typography>
          </View>
          <View className="mx-[16px] h-[114px] rounded-3xl bg-[#ECF4FC] p-[20px]">
            <View className="flex-row gap-x-4">
              <View>
                <Image
                  contentFit="contain"
                  className="size-[63px]"
                  source={require('assets/profile-completion.svg')}
                />
              </View>
              <View className="gap-[2px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Wall completion
                </Typography>
                <Typography weight={500} color="main" className="text-[14px]">
                  Details remaining
                </Typography>
                <Typography weight={400} className="text-[13px] text-[#707070]">
                  updated ago
                </Typography>
              </View>
            </View>
          </View>
        </View>
        <View className="mx-[16px] justify-between gap-7">
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Account
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  Personal Info Profile Picture
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  My Activity
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  You can view saved and applied jobs
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  General Preference
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  App preference, Common change, Themes
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Notification Manage
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  Choose your Notification Preference
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className=" flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Data Privacy & Protection
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  Enable/Disable your Private Information to be displayed.
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className=" flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Help & Support
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  Customer Support - 24*7 , Chat support, Customer call
                  representative
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
          <View className="rounded-[15px] bg-white px-7 py-[20px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-[3px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Privacy Policy
                </Typography>
                <Typography weight={400} className="text-[14px] text-[#596574]">
                  Read our Privacy policy documentation.
                </Typography>
              </View>
              <Image
                contentFit="contain"
                source={require('assets/profile-push-arrow.svg')}
                className="mt-[-18px] size-[24px]"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
