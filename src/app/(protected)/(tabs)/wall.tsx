import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonIcon, ButtonText, Typography } from '@/components/ui';
import useBoundStore from '@/lib/store';
import { removeFirstName, removeUserID } from '@/lib/store/user-store';

const walls = [
  {
    id: 1,
    title: 'CV for Itern',
    date: 'Mar 20, 2024',
    status: 'Active',
    badgeColor: 'bg-green',
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

export default function Wall() {
  const router = useRouter();
  const signOut = useBoundStore((state) => state.signOut);

  const handleSignout = () => {
    router.replace({ pathname: '/' });
    signOut();
    removeFirstName();
    removeUserID();
  };

  return (
    <SafeAreaView edges={['left', 'top', 'right']} className="grow bg-white">
      <ScrollView contentContainerClassName="p-4 pb-24 gap-[25px]">
        <ActiveWall />
        <CreateWall />
        <RecentWall />

        <Button onPress={handleSignout}>
          <ButtonText>Sign out</ButtonText>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

type WallCustomItemProps = {
  item: {
    badgeColor: string;
    date: string;
    id: number;
    status: string;
    title: string;
  };
};

const ActiveWall = () => {
  return (
    <View className="relative gap-3 rounded-xl bg-[#2800C9] px-5 py-[29px]">
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
        <View className="flex-row items-center gap-x-2">
          <ButtonIcon>
            <Image
              className="size-6 rounded-md"
              source={require('assets/wall-cv.png')}
            />
          </ButtonIcon>

          <View className="">
            <Typography weight={500} className="text-base text-white">
              CV for Itern
            </Typography>
            <Typography weight={400} className="text-sm text-white/60">
              Modified Mar 20, 2024
            </Typography>
          </View>

          <View className="ml-auto rounded-[4px] bg-[#36B222] px-2 py-1">
            <Typography weight={600} className="text-xs text-white">
              Active
            </Typography>
          </View>
        </View>

        <View className="flex-row gap-x-3">
          <Button className="h-[40px] flex-1 flex-row rounded bg-white">
            <Ionicons name="arrow-redo-sharp" size={20} color="#2800C9" />
            <ButtonText className="text-primary">Share</ButtonText>
          </Button>

          <Button className="h-[40px] flex-1 flex-row rounded border-[0.5px] border-white bg-[#2800C9]">
            <Ionicons name="download-outline" size={16} color="white" />
            <ButtonText>Download</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

const CreateWall = () => {
  const router = useRouter();

  const redirectToUploadPage = () => {
    router.push({ pathname: '/upload-resume' });
  };

  return (
    <View className="gap-3 rounded-lg border-2 border-dashed border-secondary p-4">
      <View>
        <Typography weight={700} className="text-lg text-[#0B0B0B]">
          Create Wall
        </Typography>
      </View>
      <View>
        <Typography weight={400} className="text-base text-[#6D6D6D]">
          Craft a standout resume to showcase your skills and strengths.
        </Typography>
      </View>

      <View className=" flex-row gap-x-[10px]">
        <Button
          className=" h-[46px] flex-1 gap-3 bg-[#2800C9]"
          onPress={() => {
            router.push({ pathname: '/after-onboarding/basic-info' });
          }}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <ButtonText weight={500} className="text-base text-white">
            Create New
          </ButtonText>
        </Button>

        <Button
          variant="outline"
          onPress={redirectToUploadPage}
          className="h-[46px] flex-1 gap-3 border-blue-700 "
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#2800C9" />
          <ButtonText weight={500} color="primary" className="text-base">
            Upload Resume
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

const RecentWall = () => {
  return (
    <View>
      <Typography weight={600} className="text-lg text-[#0B0B0B]">
        Recent Wall
      </Typography>

      {walls.map((item) => {
        return (
          <View key={item.id}>
            <WallCustomItem item={item} />
            <View className="bg-gray-300 h-px w-full" />
          </View>
        );
      })}
    </View>
  );
};

const WallCustomItem = ({ item }: WallCustomItemProps) => {
  return (
    <View className="bg-white p-4 shadow-sm">
      <View className="flex-row items-center rounded-lg">
        <Image className="mr-3 size-6" source={require('assets/cv-list.png')} />
        <View className="flex-1 flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Typography weight={500} className="text-[#0B0B0B]">
              {item.title}
            </Typography>
            <Typography className="text-xs text-[#6D6D6D]">
              Modified {item.date}
            </Typography>
          </View>
          <View
            className={`rounded-md ${item.badgeColor} bg-green-400 px-2 py-1`}
          >
            <Typography className="text-xs text-white">
              {item.status}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
