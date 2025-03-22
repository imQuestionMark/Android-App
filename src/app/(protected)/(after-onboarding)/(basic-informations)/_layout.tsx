import { type NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import Step from '@/components/ui/step';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BasicStackLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <OnboardingHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="basic-info"
        options={{
          title: 'Basic Information',
        }}
      />
      <Stack.Screen
        name="links"
        options={{
          title: 'Links',
        }}
      />

      <Stack.Screen
        name="education"
        options={{
          title: 'Education',
        }}
      />

      <Stack.Screen
        name="experience"
        options={{
          title: 'Experience',
        }}
      />

      <Stack.Screen
        name="projects"
        options={{
          title: 'Projects',
        }}
      />

      <Stack.Screen
        name="certificates"
        options={{
          title: 'Certification',
        }}
      />
    </Stack>
  );
};

export default BasicStackLayout;

export const OnboardingHeader = ({
  route,
  options,
  navigation,
}: NativeStackHeaderProps) => {
  const currentScreen = route.name as WallScreen;
  const isLastStep = currentScreen === 'certificates';
  const { currentStepIndex, screenOrder, setCurrentStep } = useWallStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('FIRING USEEFFECT++++');
      setCurrentStep(currentScreen);
    }, [currentScreen, setCurrentStep])
  );

  const goBack = () => {
    navigation.pop();
  };

  const goNext = () => {
    if (currentScreen === 'certificates') {
      router.replace({ pathname: '/wall' });
      return;
    }

    const { getNextScreen } = useWallStore.getState();
    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) {
      router.push({
        pathname: `/(protected)/(after-onboarding)/(basic-informations)/${nextScreen}`,
      });
    }
  };

  console.log(
    '💫💫💫 CurrentScreen',
    currentScreen,
    'Index:',
    currentStepIndex
  );

  return (
    <SafeAreaView className="bg-white px-4" edges={['top']}>
      <View className="flex-row items-center justify-between">
        <Button variant="link" className="p-0" onPress={goBack}>
          <ButtonText className="">Back</ButtonText>
        </Button>

        <Typography weight={500} className="capitalize text-[#0B0B0B]">
          {options.title}
        </Typography>

        <Button variant="link" className="p-0" onPress={goNext}>
          <ButtonText className="">{isLastStep ? 'Done' : 'Next'}</ButtonText>
        </Button>
      </View>

      <View className="mb-[16px] flex-row gap-2">
        {screenOrder.map((_, index) => {
          return (
            <Step
              key={index}
              active={index === currentStepIndex}
              completed={index < currentStepIndex}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
