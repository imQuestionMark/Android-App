import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries } from '@tanstack/react-query';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, BackHandler, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  type ProfessionalFormData,
  professionalFormSchema,
} from '@/api/authentication/professional-details';
import { useJobs } from '@/api/professional/use-jobs';
import { useLocations } from '@/api/professional/use-locations';
import {
  CTC,
  ExpCTC,
  Experience,
  Location,
  ModeOfWork,
  Role,
} from '@/components/professional/components';
import { Button, ButtonText, Typography } from '@/components/ui';
import useAppStore from '@/lib/store';
import { useAuth } from '@/lib/store/auth-store';
import { devLog } from '@/lib/utils';

const DEFAULT_VALUES: ProfessionalFormData = {
  roles: ['66e617457cde7fde2db67a91', '66e825fb212be8a319daccb5'],
  locations: ['67792d6d0854c9f5c628669c'],
  workModes: ['Hybrid'],
  currentCTC: '1',
  expectedCTC: '2',
  experience: '1 Year',
};

const Professional = () => {
  const { control, handleSubmit, setValue } = useForm<ProfessionalFormData>({
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(professionalFormSchema),
  });

  const updateOnboarding = useAuth((state) => state.updateOnboarding);
  const navigation = useNavigation();
  const router = useRouter();

  const results = useQueries({
    queries: [useJobs.getOptions(), useLocations.getOptions()],
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            updateOnboarding(1);
            navigation.goBack();
          }}
          className="p-2"
        >
          <ButtonText>BACK</ButtonText>
        </Button>
      ),
    });
  }, [navigation, updateOnboarding]);

  useEffect(() => {
    const onBackPress = () => {
      updateOnboarding(1);
      router.back();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, [router, updateOnboarding]);

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);

  const setHandler = useAppStore.getState().setHandler;
  const resetHandler = useAppStore.getState().resetHandler;

  const handlePress = useCallback(() => {
    console.log('handleButtonPresss');
    handleSubmit(
      async (data) => {
        devLog('Handle Submit professional', data);
        await updateOnboarding(9999);
      },
      (error) => {
        console.warn(JSON.stringify(error, null, 2));
      }
    )();
  }, [handleSubmit, updateOnboarding]);

  useEffect(() => {
    setHandler(handlePress);

    return () => resetHandler();
  }, [handlePress, resetHandler, setHandler]);

  if (isLoading) {
    return (
      <View className="grow items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="grow items-center justify-center">
        <Typography>Something went wrong</Typography>
      </View>
    );
  }

  const Container = Platform.OS === 'web' ? View : KeyboardAwareScrollView;

  return (
    <Container contentContainerClassName="grow" className="grow">
      <View className="grow justify-between">
        <View className="grow">
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
      </View>
    </Container>
  );
};

export default Professional;
