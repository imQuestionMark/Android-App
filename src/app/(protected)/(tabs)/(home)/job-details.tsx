import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompanyCard } from '@/components/home/company-card';
import { type TBadge } from '@/components/home/job-badge';
import { JobCard } from '@/components/home/job-card';
import { JobDescription } from '@/components/home/job-description';
import { JobDetailsCard, type TJob } from '@/components/home/job-details-card';
import { Button, ButtonText, Typography } from '@/components/ui';
import { DottedLine } from '@/components/ui/dotted-line';

const fakeMoreJobs: TJob[] = [
  {
    id: '1',
    title: 'UI / UX Designer',
    company: 'Figma',
    logo: require('assets/figma.png'),
    location: 'New York, United States',
    experience: '1-2 years Experience',
    postedDays: 20,
    matchingSkills: 5,
    isSaved: true,
    tag: 'Designing',
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Huawei',
    logo: require('assets/huawei.png'),
    location: 'Tokyo, Japan',
    experience: '1-2 years Experience',
    postedDays: 20,
    isSaved: false,
    tag: 'Development',
  },
];

const fakeJobDetails: TJob = {
  id: '1',
  title: 'UI / UX Designer',
  company: 'Figma',
  logo: require('assets/figma.png'),
  location: 'New York, United States',
  experience: '1-2 years Experience',
  postedDays: 20,
  matchingSkills: 5,
  isSaved: true,
  tag: 'Designing',
};

const fakeBadges: TBadge[] = [
  {
    icon: 'bag-outline',
    label: '1-2 Years',
  },
  {
    icon: 'bag-outline',
    label: 'Remote',
  },
  {
    icon: 'bag-outline',
    label: 'Fulltime',
  },
];

const JobDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-10">
          <JobDetailsCard job={fakeJobDetails} badges={fakeBadges} />
          <CompanyCard />
          <JobDescription />
          <DottedLine className="my-12" />
          <MoreJobs fakeMoreJobs={fakeMoreJobs} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;

const MoreJobs = ({ fakeMoreJobs }: { fakeMoreJobs: TJob[] }) => {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Typography weight={600} className="text-[20px] text-black">
          More Jobs
        </Typography>
        <Button variant="link" className="px-0">
          <ButtonText className="text-gray-500 text-[14px] underline">
            View all
          </ButtonText>
        </Button>
      </View>

      {fakeMoreJobs.map((item) => (
        <JobCard job={item} key={item.id} />
      ))}
    </View>
  );
};
