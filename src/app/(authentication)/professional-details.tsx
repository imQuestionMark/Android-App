import { zodResolver } from '@hookform/resolvers/zod';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useQueries } from '@tanstack/react-query';
import {  useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
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
import { useAuth } from '@/lib/store/auth-store';
import { devLog } from '@/lib/utils';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DEFAULT_VALUES: ProfessionalFormData = {
  roles: [],
  locations: [],
  workModes: [],
  currentCTC: '1',
  expectedCTC: '2',
  experience: '',
};

const Professional = () => {
  const { control, handleSubmit, setValue } = useForm<ProfessionalFormData>({
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(professionalFormSchema),
  });
  const updateOnboarding = useAuth((state) => state.updateOnboarding);
  const params = useLocalSearchParams();
  const router = useRouter();
  console.log({ params });

  const results = useQueries({
    queries: [useJobs.getOptions(), useLocations.getOptions()],
  });

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);

  const handlePress = () => {
    console.log('handleButtonPresss');
    handleSubmit(
      async (data) => {
        console.log(data);
        devLog('Form data valid:', data);
        await updateOnboarding(9999);
        router.replace({ pathname: '/after-onboarding/professional' });
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

            <View className="mt-6 gap-5">
              <Role control={control} />
              <Experience control={control} />
              <Location control={control} />
              <ModeOfWork control={control} />
              <CTC control={control} setValue={setValue} />
              <ExpCTC control={control} setValue={setValue} />
            </View>
          </View>

          <BottomNav onPress={handlePress} />
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
};

export default Professional;
