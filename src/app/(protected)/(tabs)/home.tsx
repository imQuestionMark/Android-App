import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

import { Button, ButtonText, Typography } from '@/components/ui';

const jobs = [
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
    matchingSkills: 2,
    isSaved: true,
    tag: 'Development',
  },
  {
    id: '3',
    title: 'Business Analyst',
    company: 'Apple Inc.',
    logo: require('assets/apple.png'),
    location: 'Chicago, United States',
    experience: '0-6 months Experience',
    postedDays: 20,
    isSaved: false,
    tag: 'Marketing',
  },
];

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Development', 'Designing', 'Marketing', 'Sales'];

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 'All') return true;
    return job.tag === activeFilter;
  });

  return (
    <LinearGradient colors={['#DFE8FF', '#FFFFFF']} className="flex-1">
      <SafeAreaView className="grow px-5" edges={['top']}>
        <View className="flex-row gap-2">
          <Typography weight={500} className="text-[24px] text-black">
            Hey
          </Typography>
          <Typography weight={700} className="text-[24px] text-primary">
            John!
          </Typography>
        </View>

        <FilterComponent
          filters={filters}
          activeFilter={activeFilter}
          handleFilterPress={handleFilterPress}
        />

        <View className="flex-row items-center justify-between">
          <Typography weight={600} className="text-[20px] text-black">
            Top Companies Hiring
          </Typography>
          <Button variant="link" className="px-0">
            <ButtonText className="text-gray-500 text-[14px] underline">
              View all
            </ButtonText>
          </Button>
        </View>

        <JobListing jobs={filteredJobs} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const FilterComponent = ({ filters, activeFilter, handleFilterPress }) => {
  return (
    <View className="my-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4"
      >
        {filters.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            isActive={activeFilter === filter}
            onPress={() => handleFilterPress(filter)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const pillStyles = tv({
  slots: {
    pill: 'rounded-full px-6 py-2',
    text: 'font-poppins-regular text-[14px]',
  },
  variants: {
    isActive: {
      true: {
        pill: 'bg-primary',
        text: 'font-poppins-semibold text-white',
      },
      false: {
        pill: 'border border-blue-400 bg-white',
        text: 'text-primary',
      },
    },
  },
});

const { pill, text } = pillStyles();

const FilterPill = ({ label, isActive, onPress }) => {
  return (
    <Button variant="link" className={pill({ isActive })} onPress={onPress}>
      <Typography className={text({ isActive })}>{label}</Typography>
    </Button>
  );
};

const JobCard = ({ job }) => {
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
    <View className="border-gray-200 mb-4 rounded-[12px]  bg-white pt-4">
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

      <View className="m-4 border-b border-dashed border-[#838383]" />

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
        <View className="flex-row gap-4 rounded-e-[12px] bg-green px-4 py-3">
          <Ionicons name="shield-checkmark-outline" size={20} color="white" />
          <Typography className="text-[14px] text-white" weight={500}>
            match {matchingSkills} Skills
          </Typography>
        </View>
      )}
    </View>
  );
};

const JobListing = ({ jobs }) => {
  return (
    <View className="mt-4 flex-1">
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={jobs.length === 0 ? { flex: 1 } : null}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center ">
            <Ionicons name="sad-outline" size={24} color="black" />
            <Typography className="text-gray-500 text-[16px]">
              No jobs found
            </Typography>
          </View>
        )}
      />
    </View>
  );
};
