import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type TJob } from '@/api/home/jobs/use-jobs.query';
import { CompanyCard } from '@/components/home/company-card';
import { JobCard } from '@/components/home/job-card';
import { JobDescription } from '@/components/home/job-description';
import { JobDetailsCard } from '@/components/home/job-details-card';
import { Button, ButtonText, Typography } from '@/components/ui';
import { DottedLine } from '@/components/ui/dotted-line';

const fakeMoreJobs: TJob[] = [
  {
    designation: 'Mobile Developer - Engineer',
    location: ['New York', 'San Francisco'],
    isActive: true,
    jobType: 'Full-time',
    workMode: 'Hybrid',
    skillsRequired: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
    recruiterId: '6794c33bc93430e53630b4f5',
    minExperience: 3,
    maxExperience: 5,
    salary: '0.5 LPA-4 LPA',
    jobDescription:
      'We are looking for a skilled Software Engineer to join our dynamic team, specializing in backend development using Django and Python.',
    noticePeriod: '2 months',
    check: 75,
    id: '67fb5f44620ee9ed8e2dd2f8',
  },
  {
    designation: 'Frontend Developer - Engineer',
    location: ['New York', 'San Francisco'],
    isActive: true,
    jobType: 'Full-time',
    workMode: 'Hybrid',
    skillsRequired: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
    recruiterId: '6794c33bc93430e53630b4f5',
    minExperience: 3,
    maxExperience: 5,
    salary: '0.5 LPA-4 LPA',
    jobDescription:
      'We are looking for a skilled Software Engineer to join our dynamic team, specializing in backend development using Django and Python.',
    noticePeriod: '2 months',
    check: 75,
    id: '67fb9bf8ce011b052a6f5173',
  },
];

const fakeJobDetails: TJob = {
  designation: 'Backend Developer - Engineer',
  location: ['New York', 'San Francisco'],
  isActive: true,
  jobType: 'Full-time',
  workMode: 'Hybrid',
  skillsRequired: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
  recruiterId: '6794c33bc93430e53630b4f5',
  minExperience: 3,
  maxExperience: 5,
  salary: '0.5 LPA-4 LPA',
  jobDescription:
    'We are looking for a skilled Software Engineer to join our dynamic team, specializing in backend development using Django and Python.',
  noticePeriod: '2 months',
  check: 75,
  id: '67fb5f44620ee9ed8e2dd2f8',
};

const JobDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-10">
          <JobDetailsCard job={fakeJobDetails} />
          <CompanyCard />
          <JobDescription skills={fakeJobDetails.skillsRequired} />
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
