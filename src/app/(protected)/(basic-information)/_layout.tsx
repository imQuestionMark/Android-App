import { getHeaderTitle, Header } from '@react-navigation/elements';
import { type NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import React, { type ReactNode, useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import Step from '@/components/ui/step';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BasicInfoStackLayout = () => {
  const currentStepIndex = useWallStore((s) => s.currentStepIndex);
  const screenOrder = useWallStore((s) => s.screenOrder);

  return (
    <Stack
      screenOptions={{
        // header: (props) => <OnboardingHeader {...props} />,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
          color: 'black',
          fontFamily: 'Poppins-Medium',
        },
        header: ({ options, route, back }) => (
          <Header
            {...options}
            back={back}
            headerStyle={{
              height: 70,
            }}
            title={getHeaderTitle(options, route.name)}
          />
        ),
      }}
      screenLayout={(props) => (
        <ScreenLayout
          {...props}
          currentStepIndex={currentStepIndex}
          screenOrder={screenOrder}
        />
      )}
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

export default BasicInfoStackLayout;

const BASE_PATH = '(protected)/(basic-information)';

export const OnboardingHeader = ({
  route,
  options,
}: NativeStackHeaderProps) => {
  const currentScreen = route.name as WallScreen;
  const isLastStep = currentScreen === 'achievement';
  const currentStepIndex = useWallStore((s) => s.currentStepIndex);
  const setCurrentStep = useWallStore((s) => s.setCurrentStep);
  const screenOrder = useWallStore((s) => s.screenOrder);
  const getPreviousScreen = useWallStore((s) => s.getPreviousScreen);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log('🏹 FIRING USE FOCUS EFFECT++++');
      setCurrentStep(currentScreen);
    }, [currentScreen, setCurrentStep])
  );

  const goBack = () => {
    const prev = getPreviousScreen(currentScreen);
    if (prev) {
      console.log({ prevScreen: prev });
      router.push({ pathname: `/${BASE_PATH}/${prev}` });
    } else {
      console.log('No previous screen found, redirecting to wall');
      router.replace({ pathname: '/wall' });
    }
  };

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

  const { top } = useSafeAreaInsets();

  return (
    <View className="bg-white px-4" style={{ paddingTop: top }}>
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
    </View>
  );
};

export const ScreenLayout = ({
  children,
  currentStepIndex,
  screenOrder,
}: {
  children: ReactNode;
  currentStepIndex: number;
  screenOrder: string[];
}) => {
  return (
    <View className="p-4 pt-0">
      <View className="mb-[16px] flex-row gap-2">
        {screenOrder.map((_, index) => (
          <Step
            key={index}
            active={currentStepIndex === index}
            completed={currentStepIndex > index}
          />
        ))}
      </View>
      {children}
    </View>
  );
};
