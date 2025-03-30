import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Clock,
  MapPin,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Typography } from '@/components/ui';

const jobs = [
  {
    id: 1,
    title: 'UI / UX Designer',
    company: 'Figma',
    location: 'New York, United States',
    experience: '1-2 years Experience',
    daysAgo: '20 days ago',
    skills: 'match 6 Skills',

    badgeColor: 'bg-green-500',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Huawei',
    location: 'Tokyo, Japan',
    experience: '1-2 years Experience',
    daysAgo: '20 days ago',
    skills: 'match 6 Skills',

    badgeColor: 'bg-blue-700',
  },
  {
    id: 3,
    title: 'Business Analyst',
    company: 'Apple Inc.',
    location: 'Chicago, United States',
    experience: '0-6 months Experience',
    daysAgo: '20 days ago',
    skills: '',

    badgeColor: '',
  },
];

export default function MyActivity() {
  const [selectedTab, setSelectedTab] = useState('applied');

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <View className="mb-4 flex-row items-center">
        <Button variant="ghost">
          <ArrowLeft size={24} color="black" />
        </Button>
        <Typography className="ml-3 text-xl font-semibold">
          My Activity
        </Typography>
      </View>

      <View className="mb-4 flex-row items-center gap-2">
        <Button
          variant="ghost"
          className={`rounded-full border-0 px-4 py-2 ${
            selectedTab === 'applied' ? 'bg-primary' : 'border border-[#B2D5FF]'
          }`}
          onPress={() => setSelectedTab('applied')}
        >
          <Typography
            className={`text-sm ${selectedTab === 'applied' ? 'text-white' : 'text-primary'}`}
          >
            Applied Jobs
          </Typography>
        </Button>
        <Button
          variant="ghost"
          className={`rounded-full border-0 px-4 py-2 ${
            selectedTab === 'saved' ? 'bg-primary' : 'border border-[#B2D5FF]'
          }`}
          onPress={() => setSelectedTab('saved')}
        >
          <Typography
            className={`text-sm ${selectedTab === 'saved' ? 'text-white' : 'text-primary'}`}
          >
            Saved Jobs
          </Typography>
        </Button>
      </View>
      {/* Job List */}
      <ScrollView>
        <View className="gap-[24px]">
          {' '}
          {jobs.map((job) => (
            <View
              key={job.id}
              className="rounded-lg border border-[#596574] py-[20px]"
            >
              <View className="flex-1 flex-col justify-between">
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-start gap-3">
                    <View>
                      <Typography
                        weight={600}
                        className="text-[20px] text-black"
                      >
                        {job.title}
                      </Typography>
                      <Typography
                        weight={400}
                        className="text-[18px] text-[#596574]"
                      >
                        {job.company}
                      </Typography>
                    </View>
                  </View>
                  <Bookmark size={20} color="blue" className="mr-3 mt-1" />
                </View>

                <View className="mx-[6px] my-4 border-b border-dashed border-[#838383]" />

                <View className="gap-[12px]">
                  <View className="mx-[10px] flex-row items-center gap-2">
                    <MapPin size={16} color="gray" />
                    <Typography
                      weight={400}
                      className="text-[16px] text-[#596574]"
                    >
                      {job.location}
                    </Typography>
                  </View>
                  <View className="flex-row items-center gap-10">
                    {/* Experience Pill */}
                    <View className="flex-row items-center gap-2 rounded-r-[49.5px] bg-blue-100 px-3 py-1">
                      <BriefcaseBusiness size={16} color="#0400D1" />
                      <Typography
                        weight={400}
                        className="text-[16px] text-primary"
                      >
                        {job.experience}
                      </Typography>
                    </View>

                    {/* Days Ago (Ensuring It Stays Outside the Pill) */}
                    <View className="min-w-[60px] flex-row items-center gap-2">
                      <Clock size={16} color="gray" />
                      <Typography
                        weight={400}
                        className="text-[14px] text-[#596574]"
                      >
                        {job.daysAgo}
                      </Typography>
                    </View>
                  </View>
                </View>

                {job.skills && (
                  <View
                    className={`mt-3 w-full rounded-b-lg p-2 ${job.badgeColor}`}
                  >
                    <Typography className="text-left text-white">
                      {job.skills}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
