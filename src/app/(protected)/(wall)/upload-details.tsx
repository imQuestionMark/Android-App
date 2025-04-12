import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MilestoneCard from '@/components/basic-informations/upload-details/milestone-card';
import { Button, ButtonText, Typography } from '@/components/ui';
import { Idea } from '@/components/ui/icons/idea';

const steps = [
  {
    number: 1,
    title: 'Basic Information',
    description:
      'Enter your Email Address, Phone Number, Locatteion, About me. ',
    completed: true,
    href: '/basic-info',
  },
  {
    number: 2,
    title: 'Links',
    description:
      'Enter your links, so that recruiters can verify your social and proof of works.',
    completed: true,
    href: '/links',
  },
  {
    number: 3,
    title: 'Education',
    description:
      'Enter your college, universities or training programs that you have attended',
    active: true,
    extraContent: '4 more fields',
    href: '/education',
  },
  {
    number: 4,
    title: 'Experience',
    description: 'Enter your experience details from the start of your career.',
    href: '/experience',
  },

  {
    number: 5,
    title: 'Projects',
    description: 'Enter your project name along with description.',
    href: '/projects',
  },
  {
    number: 6,
    title: 'Certification',
    description:
      'Enter your certification along with the link to boost your wall.',
    href: '/certificates',
  },
  {
    number: 7,
    title: 'Skill',
    description: 'Enter your skill and rate them based on your expertise. ',
    href: '/skills',
  },
  {
    number: 8,
    title: 'Achievements',
    description:
      'Enter your acheivements let recruiters know about work ethics.',
    href: '/achievement',
  },
];

const UploadDetails = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <ImageBackground
        source={require('assets/home.png')}
        contentFit="cover"
        style={{
          paddingTop: insets.top,
        }}
      >
        <Header />
        <ProfileCard />
      </ImageBackground>

      <WallMilestone />
    </>
  );
};

export default UploadDetails;

const Header = () => {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) return router.back();
    router.dismissTo({ pathname: '/wall' });
  };

  const onSave = () => {
    // TEMPORARY FUNCTION
    router.dismissTo({ pathname: '/wall' });
  };

  return (
    <View className="flex-row items-center justify-between px-4">
      <Button variant="icon" className="border-0" onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color="#000080" />
      </Button>

      <View className="flex-row items-center">
        <Typography weight={500} className="text-xl text-[#000080]">
          Wall Name
        </Typography>
        <Button variant="icon" className="border-0">
          <Ionicons name="pencil" size={18} color="#000080" />
        </Button>
      </View>

      <Button variant="ghost" className="p-0" onPress={onSave}>
        <ButtonText weight={500} className="text-xl text-[#000080]">
          Save
        </ButtonText>
      </Button>
    </View>
  );
};

const ProfileCard = () => {
  return (
    <View className="px-4 py-2">
      <View className="overflow-hidden rounded-xl border-[0.5px] border-primary bg-white ">
        <View className="flex-row items-center gap-2 p-4">
          <Image
            source={require('assets/profile.png')}
            className="size-[64px]"
          />

          <View className="">
            <Typography weight={500} className="text-[20px] text-primary">
              Andrew Garfield
            </Typography>
            <Typography weight={400} className="text-[14px] text-gray">
              UI Developer
            </Typography>
          </View>

          <Button
            variant="outline"
            className="ml-auto max-h-7 border-0 bg-[#FFECB3] px-2 py-0.5"
          >
            <ButtonText className="text-[10px] text-[#7F6003]" weight={500}>
              20% Completed
            </ButtonText>
          </Button>
        </View>

        <View className="flex-row items-center justify-between bg-[#F9FBFF] p-4">
          <View className="flex-row items-center gap-4">
            <Idea />
            <Typography weight={400} className="text-[14px] text-black">
              Tips for your resume
            </Typography>
          </View>
          <Ionicons name="chevron-forward" size={12} color="gray" />
        </View>
      </View>
    </View>
  );
};

const WallMilestone = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom }} className="flex-1">
      <View className="flex-row items-center gap-4 px-4 py-2">
        <Typography weight={500} className="text-[18px] text-black">
          Wall Milestone
        </Typography>

        <Button variant="outline" className="h-auto border-gray px-2 py-0.5">
          <ButtonText className="text-[10px]" weight={500}>
            5 more left
          </ButtonText>
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4 p-4">
          {steps.map((item, index) => {
            return <MilestoneCard item={item} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};
