import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Button, ButtonIcon, ButtonText, Typography } from '@/components/ui';

export default function wall() {
  const walls = [
    {
      id: 1,
      title: 'CV for Itern',
      date: 'Mar 20, 2024',
      status: 'Active',
      badgeColor: 'bg-green-500',
    },
    {
      id: 2,
      title: 'Resume for TCS',
      date: 'Mar 10, 2024',
      status: '49%',
      badgeColor: 'bg-yellow-500',
    },
    {
      id: 3,
      title: 'Data engineer - Resume',
      date: 'Mar 12, 2024',
      status: '12% Completed',
      badgeColor: 'bg-red-500',
    },
  ];
  return (
    <View className="bg-gray-100 mt-4  justify-center gap-[25px] p-4">
      <View className="relative h-[245px] w-full gap-3 rounded-xl bg-[#2800C9] px-5 py-[29px]">
        <Image
          source={require('assets/wall-pattern.png')}
          className="absolute inset-0 h-[245px]"
          contentFit="cover"
        />
        <Image
          source={require('assets/hashtag.png')}
          className="absolute right-2 top-2 h-[72px] w-[67px]"
          contentFit="contain"
          contentPosition={{ top: '10%', right: '10%' }}
        />
        <Typography weight={700} className="text-lg text-white">
          Active Wall
        </Typography>
        <Typography weight={400} className="text-sm text-white/60">
          Craft a standout resume to showcase your skills and strengths.
        </Typography>
        <View className="gap-6">
          <View className="flex-row items-center">
            <ButtonIcon>
              <Image
                className="size-6 rounded-md"
                source={require('assets/wall-cv.png')}
              />
            </ButtonIcon>
            <View className="ml-2">
              <Typography weight={500} className="text-base text-white">
                CV for Itern
              </Typography>
              <Typography weight={400} className="text-sm text-white/60">
                Modified Mar 20, 2024
              </Typography>
            </View>
            <View
              //className={`rounded-md px-2 py-1 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
              className="ml-auto rounded-[4px] bg-[#36B222] px-2 py-1"
            >
              <Typography className="text-xs font-semibold text-white">
                {/* {isActive ? 'Active' : 'Inactive'} */}
                Active
              </Typography>
            </View>
          </View>
          <View className="w-full flex-row items-center gap-x-3">
            <Button className="h-[40px] flex-1 flex-row rounded bg-white">
              <View className="flex-row items-baseline gap-2">
                <Image
                  source={require('assets/share.png')}
                  className="size-4"
                />
                <ButtonText className="text-primary">Share</ButtonText>
              </View>
            </Button>
            <Button className="roun h-[40px] flex-1 flex-row border-[0.5px] border-white bg-[#2800C9]">
              <View className="flex-row items-baseline gap-2">
                <Image
                  source={require('assets/download.png')}
                  className="size-4 "
                />
                <ButtonText>Download</ButtonText>
              </View>
            </Button>
          </View>
        </View>
      </View>
      <View className="gap-8">
        <View className="gap-3 rounded-lg border-2 border-dashed border-[#1849D6] p-4">
          <View>
            <Typography weight={700} className="text-lg text-[#0B0B0B]">
              Create Wall
            </Typography>
          </View>
          <View>
            <Typography weight={400} className="text-sm text-[#6D6D6D]">
              Craft a standout resume to showcase your skills and strengths.
            </Typography>
          </View>

          <View className=" flex-row gap-x-[10px]">
            <Button className=" h-[46px] flex-1 flex-row items-center justify-center rounded-md bg-[#2800C9] p-2">
              <View className="flex-row gap-2 self-auto">
                <Image
                  source={require('assets/Frame.png')}
                  className="size-4"
                />
                <ButtonText className="text-white">Create New</ButtonText>
              </View>
            </Button>
            <Button className="h-[46px] flex-1 flex-row items-center justify-center rounded-md border border-blue-700 bg-white p-2">
              <View className="flex-row gap-2 self-auto">
                <Image
                  source={require('assets/upload-1.png')}
                  className="size-4 text-white"
                  style={{ tintColor: '#0400D1' }}
                />
                <ButtonText className="text-primary">Upload Resume</ButtonText>
              </View>
            </Button>
          </View>
        </View>

        <Typography weight={600} className="text-lg text-[#0B0B0B]">
          Recent Wall
        </Typography>
        <FlatList
          data={walls}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-white p-4 shadow-sm">
              <View className="flex-row items-center rounded-lg">
                <Image
                  className="mr-3 size-6"
                  source={require('assets/cv-list.png')}
                />
                <View className="flex-1 flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Typography weight={500} className="text-[#0B0B0B]">
                      {item.title}
                    </Typography>
                    <Typography className="text-xs text-[#6D6D6D]">
                      Modified {item.date}
                    </Typography>
                  </View>
                  <View className={`rounded-md ${item.badgeColor} px-2 py-1`}>
                    <Typography className="text-xs text-white">
                      {item.status}
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View className="bg-gray-300 h-px w-full" />
          )}
        />
      </View>
    </View>
  );
}
