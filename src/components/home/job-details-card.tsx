import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { type TJob } from '@/api/home/jobs/use-jobs.query';
import { DottedLine } from '@/components/ui/dotted-line';

import { Button, ButtonText, Typography } from '../ui';
import { JobBadge, type TBadge } from './job-badge';

export type TJobCardProps = {
  job: TJob;
};

export const JobDetailsCard: React.FC<TJobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleApplyJob = async () => {
    router.push({ pathname: '/applied-success' });
  };

  const jobDetailBadges: TBadge[] = [
    {
      icon: 'bag-outline',
      label: `${job.minExperience}-${job.maxExperience} Years`,
    },
    {
      icon: 'desktop-outline',
      label: `${job.workMode}`,
    },
    {
      icon: 'time-outline',
      label: `${job.jobType}`,
    },
  ];

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
            source={'job.logo'}
            contentFit="contain"
            placeholder={
              'https://avatar.iran.liara.run/username?username=Figma+'
            }
            className="size-[55px] overflow-hidden rounded-[12px] border border-black"
            alt={job.designation.slice(0, 1)}
          />
          <Typography className="text-[20px] text-black" weight={500}>
            {job.designation}
          </Typography>
          <Typography className="text-[18px]" weight={500}>
            {job.recruiterId}
          </Typography>
        </View>

        <DottedLine className="my-4" />

        <View className="mb-3 mt-2 items-center gap-4">
          <View className="flex-row items-center gap-4 px-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {job.location.join(', ')}
            </Typography>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-center gap-[12px]">
          {jobDetailBadges.map((item, index) => (
            <JobBadge key={index} icon={item.icon} label={item.label} />
          ))}
        </View>

        <View className=" mt-4 flex-row items-center justify-center gap-4">
          <FontAwesome5 name="coins" size={20} color="#0400D1" />
          <Typography className="text-[16px] text-primary">
            {job.salary} Salary
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
