import { useSuspenseQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Skeleton } from 'moti/skeleton';
import React, { Suspense, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type TJob } from '@/api/home/jobs/use-jobs.query';
import { FilterComponent } from '@/components/home/job-filter';
import { JobListing, ListHeader } from '@/components/home/job-listing';
import { SearchBar } from '@/components/home/job-search';
import { DottedLine, Typography } from '@/components/ui';

import { fetchJobs } from '../../../../api/home/jobs/use-jobs.query';

type FilterOptions =
  | 'All'
  | 'Designing'
  | 'Development'
  | 'Marketing'
  | 'Sales';

const fakePostmanJobs: TJob[] = [
  {
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

const fakeFilters: FilterOptions[] = [
  'All',
  'Development',
  'Designing',
  'Marketing',
  'Sales',
];

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOptions>('All');

  const handleFilterPress = (filter: FilterOptions) => {
    setActiveFilter(filter);
  };

  // const filteredJobs = data?.items.filter((job) => {
  //   if (activeFilter === 'All') return true;
  //   return job.designation.toLowerCase().includes(activeFilter.toLowerCase());
  // });

  return (
    <LinearGradient colors={['#DFE8FF', '#FFFFFF']} style={{ flex: 1 }}>
      <SafeAreaView className="grow px-5" edges={['top']}>
        <View className="flex-row gap-2">
          <Typography weight={500} className="text-[24px] text-black">
            Hey
          </Typography>
          <Typography weight={700} className="text-[24px] text-primary">
            John!
          </Typography>
        </View>

        <SearchBar />

        <FilterComponent
          filters={fakeFilters}
          activeFilter={activeFilter}
          handleFilterPress={handleFilterPress}
        />

        <ListHeader />

        <Suspense fallback={<SuspendedLoaderFallback />}>
          <JobListingSuspended activeFilter={activeFilter} />
        </Suspense>
      </SafeAreaView>
    </LinearGradient>
  );
};

const SuspendedLoaderFallback = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {[...Array(5)].map((_, i) => (
        <LoaderFallback key={i} />
      ))}
    </ScrollView>
  );
};

const LoaderFallback = () => {
  return (
    <View
      className="border-gray-200 mt-4 rounded-[12px] bg-white p-4"
      style={{
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <View>
        <View className="flex-row gap-4">
          <Skeleton colorMode="light" radius={12} height={75} width={75} />

          <View className="flex-1 gap-4">
            <Skeleton colorMode="light" radius={25} width={'40%'} />
            <Skeleton colorMode="light" radius={25} width={'100%'} />
          </View>
        </View>

        <DottedLine className="my-4 opacity-20" />

        <View className="gap-4">
          <View className=" flex-row justify-between">
            <Skeleton colorMode="light" radius={25} width={'40%'} />

            <View className="items-end">
              <Skeleton colorMode="light" radius={25} width={'50%'} />
            </View>
          </View>

          <Skeleton colorMode="light" radius={25} width={'100%'} />
        </View>
      </View>
    </View>
  );
};

const JobListingSuspended = ({
  activeFilter,
}: {
  activeFilter: FilterOptions;
}) => {
  const { data } = useSuspenseQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

  const filteredJobs = data?.items.filter((job) => {
    if (activeFilter === 'All') return true;
    return job.designation.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return <JobListing jobs={filteredJobs} />;
};

export default Home;
