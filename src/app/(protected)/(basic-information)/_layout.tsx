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

      <Stack.Screen
        name="skills"
        options={{
          title: 'Skill',
        }}
      />

      <Stack.Screen
        name="achievement"
        options={{
          title: 'Achievements',
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
  const isLastStep = currentScreen === 'achievement';
  const currentStepIndex = useWallStore((s) => s.currentStepIndex);
  const setCurrentStep = useWallStore((s) => s.setCurrentStep);
  const screenOrder = useWallStore((s) => s.screenOrder);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('FIRING USE FOCUS EFFECT++++');
      setCurrentStep(currentScreen);
    }, [currentScreen, setCurrentStep])
  );

  const goBack = useCallback(() => navigation.pop(), [navigation]);

  const goNext = useCallback(() => {
    if (isLastStep) {
      return router.replace({ pathname: '/wall' });
    }

    const { getNextScreen } = useWallStore.getState();
    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) {
      router.push({
        pathname: `/(protected)/(basic-information)/${nextScreen}`,
      });
    }
  }, [currentScreen, isLastStep, router]);

  return (
    <SafeAreaView className="bg-white px-4" edges={['top']}>
      <View className="flex-row items-center justify-between">
        <Button variant="link" className="p-0" onPress={goBack}>
          <ButtonText>Back</ButtonText>
        </Button>

        <Typography weight={500} className="capitalize text-[#0B0B0B]">
          {options.title}
        </Typography>

        <Button variant="link" className="p-0" onPress={goNext}>
          <ButtonText>{isLastStep ? 'Done' : 'Next'}</ButtonText>
        </Button>
      </View>

      <View className="mb-[16px] flex-row gap-2">
        {screenOrder.map((_, index) => {
          return (
            <Step
              key={index}
              active={currentStepIndex === index}
              completed={currentStepIndex > index}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};
