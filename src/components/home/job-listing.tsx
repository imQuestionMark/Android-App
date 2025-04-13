import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, View } from 'react-native';

import { type TJob } from '@/api/home/jobs/use-jobs.query';
import { Button, ButtonText, Typography } from '@/components/ui';

import { JobCard } from './job-card';

export const JobListing = ({ jobs }: { jobs: TJob[] }) => {
  return (
    <View className="mt-4 flex-1">
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={jobs.length === 0 ? { flex: 1 } : null}
        // ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
};

export const ListHeader = () => {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <Typography weight={600} className="text-[20px] text-black">
        Top Companies Hiring
      </Typography>
      <Button variant="link" className="px-0">
        <ButtonText className="text-gray-500 text-[14px] underline">
          View all
        </ButtonText>
      </Button>
    </View>
  );
};

const ListEmpty = () => {
  return (
    <View className="flex-1 items-center justify-center ">
      <Ionicons name="sad-outline" size={24} color="black" />
      <Typography className="text-gray-500 text-[16px]">
        No jobs found
      </Typography>
    </View>
  );
};

const ListFooter = () => {
  return <View className="pb-14" />;
};
