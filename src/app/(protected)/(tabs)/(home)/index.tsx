import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type TJob } from '@/api/home/jobs/use-jobs.query';
import { FilterComponent } from '@/components/home/job-filter';
import { JobListing } from '@/components/home/job-listing';
import { SearchBar } from '@/components/home/job-search';
import { Typography } from '@/components/ui';

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
    _id: '67fb5f44620ee9ed8e2dd2f8',
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
    _id: '67fb9bf8ce011b052a6f5173',
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

  const filteredJobs = fakePostmanJobs.filter((job) => {
    if (activeFilter === 'All') return true;
    return job.designation.toLowerCase().includes(activeFilter.toLowerCase());
  });

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

        <JobListing jobs={filteredJobs} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
