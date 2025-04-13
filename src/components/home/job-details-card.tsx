import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { DottedLine } from '@/components/ui/dotted-line';

import { Button, ButtonText, Typography } from '../ui';
import { JobBadge, type TBadge } from './job-badge';

export type TJob = {
  company: string;
  experience: string;
  id: string;
  isSaved: boolean;
  location: string;
  logo: any;
  matchingSkills?: number;
  postedDays: number;
  tag: string;
  title: string;
};

export type TJobCardProps = {
  badges: TBadge[];
  job: TJob;
};

export const JobDetailsCard: React.FC<TJobCardProps> = ({ job, badges }) => {
  const { title, company, logo, location } = job;
  const router = useRouter();

  const handleApplyJob = async () => {
    console.log('Clicked on Apply Job');
    router.push({ pathname: '/applied-success' });
  };

  return (
    <LinearGradient
      colors={['#DFE8FF', '#FFFFFF']}
      style={{
        borderRadius: 12,
      }}
    >
      <View className=" rounded-2xl border border-primary p-6">
        <View className=" items-center gap-6">
          <Image
            source={logo}
            contentFit="contain"
            className="size-[55px] overflow-hidden rounded-[12px] border border-black"
          />
          <Typography className="text-[20px] text-black" weight={500}>
            {title}
          </Typography>
          <Typography className="text-[18px]" weight={500}>
            {company}
          </Typography>
        </View>

        <DottedLine className="my-4" />

        <View className="mb-3 mt-2 items-center gap-4">
          <View className="flex-row items-center gap-4 px-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {location}
            </Typography>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-center gap-[12px]">
          {badges.map((item, index) => (
            <JobBadge key={index} icon={item.icon} label={item.label} />
          ))}
        </View>

        <View className=" mt-4 flex-row items-center justify-center gap-4">
          <Ionicons name="logo-bitcoin" size={20} color={'#0400D1'} />
          <Typography className="text-[16px] text-primary">
            3LPA - 4LPA Salary
          </Typography>
        </View>

        <View className="mt-4 items-center justify-center">
          <Button className="px-20" variant="solid" onPress={handleApplyJob}>
            <ButtonText weight={500} className="text-[16px]">
              Apply Job
            </ButtonText>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};
