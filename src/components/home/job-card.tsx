import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Button, Typography } from '@/components/ui';

import { DottedLine } from '../ui/dotted-line';

type Job = {
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

type JobCardProps = {
  job: Job;
};

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const {
    title,
    company,
    logo,
    location,
    experience,
    postedDays,
    matchingSkills,
    isSaved,
  } = job;

  return (
    <Link href={{ pathname: '/job-details' }} asChild>
      <Pressable
        className="border-gray-200 mx-px mb-4 rounded-[12px] bg-white pt-4"
        style={{
          boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        <View className="flex-row items-start justify-between px-4">
          <View className="flex-row gap-6">
            <Image source={logo} contentFit="contain" className="size-[55px]" />

            <View className="flex-1 flex-row justify-between">
              <View>
                <Typography className="text-[20px] text-black" weight={500}>
                  {title}
                </Typography>
                <Typography className="text-[18px]" weight={500}>
                  {company}
                </Typography>
              </View>

              <Button variant="icon" className="border-0" onPress={() => {}}>
                {isSaved ? (
                  <Ionicons name="bookmark" size={24} color="#0400D1" />
                ) : (
                  <Ionicons name="bookmark-outline" size={24} color="#0400D1" />
                )}
              </Button>
            </View>
          </View>
        </View>

        <DottedLine className="m-4" />

        <View className="mb-3 mt-2 gap-4">
          <View className="flex-row items-center gap-4 px-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {location}
            </Typography>
          </View>

          <View className="flex-row justify-between ">
            <View className="flex-row items-center gap-2 rounded-r-xl bg-[#F2F9FF] px-4 py-1">
              <Ionicons name="bag-outline" size={20} color="#0400D1" />
              <Typography className="text-[16px] text-primary">
                {experience}
              </Typography>
            </View>

            <View className="flex-row items-center gap-2 pr-4">
              <Ionicons name="time-outline" size={20} color="#596574" />
              <Typography className="text-[16px] text-[#596574]">
                {postedDays} days ago
              </Typography>
            </View>
          </View>
        </View>

        {matchingSkills && (
          <View
            className="flex-row gap-4  bg-green px-4 py-3"
            style={{
              borderBottomEndRadius: 12,
              borderBottomStartRadius: 12,
            }}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color="white" />
            <Typography className="text-[14px] text-white" weight={500}>
              match {matchingSkills} Skills
            </Typography>
          </View>
        )}
      </Pressable>
    </Link>
  );
};
