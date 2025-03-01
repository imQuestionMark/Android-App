import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { useJobs } from '@/api/professional/use-jobs';
import { useLocations } from '@/api/professional/use-locations';
import GradientView from '@/components/onboarding/gradient-view';
import BottomNav from '@/components/personal-details/bottom-nav';
import {
  CTC,
  ExpCTC,
  Experience,
  Location,
  ModeOfWork,
  Role,
} from '@/components/professional/components';
import {
  type ProfessionalFormData,
  professionalFormSchema,
} from '@/components/professional/schema';
import { Typography } from '@/components/ui';

const Professional = () => {
  const { control, handleSubmit } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      roles: [],
      locations: [],
      workModes: [],
      currentCTC: '',
      expectedCTC: '',
    },
    shouldFocusError: false,
  });

  // Parallel GET Requests.
  const results = useQueries({
    queries: [useJobs.getOptions(), useLocations.getOptions()],
  });

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);

  const handlePress = () => {
    console.log('handleButtonPresss');
    handleSubmit(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.warn(JSON.stringify(error, null, 2));
      }
    )();
  };

  if (isLoading) {
    return (
      <GradientView className="grow items-center justify-center">
        <ActivityIndicator />
      </GradientView>
    );
  }

  if (isError) {
    return (
      <GradientView>
        <Typography>Something went wrong</Typography>;
      </GradientView>
    );
  }

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between">
          <View className="">
            <Typography weight={600} color="main" className="text-[24px]">
              Job preference
            </Typography>

            <View className="mt-6">
              <Role control={control} />
              <Experience control={control} />
              <Location control={control} />
              <ModeOfWork control={control} />
              <CTC control={control} />
              <ExpCTC control={control} />
            </View>
          </View>

          <BottomNav onPress={handlePress} />
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
};

export default Professional;
