import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import Step from '@/components/ui/step';

const BasicStackLayout = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  type Screen =
    | 'basic-info'
    | 'certificates'
    | 'education'
    | 'experience'
    | 'links'
    | 'projects';

  const goNext = (currentScreen: string) => {
    const navigationFlow: Record<Screen, () => void> = {
      'basic-info': () => router.push({ pathname: '/after-onboarding/links' }),
      links: () => router.push({ pathname: '/after-onboarding/education' }),
      education: () =>
        router.push({ pathname: '/after-onboarding/experience' }),
      experience: () => router.push({ pathname: '/after-onboarding/projects' }),
      projects: () =>
        router.push({ pathname: '/after-onboarding/certificates' }),
      certificates: () => router.replace({ pathname: '/wall' }),
    };

    if (currentScreen in navigationFlow) {
      console.log(navigationFlow[currentScreen as Screen]);
      navigationFlow[currentScreen as Screen]();
    }
  };

  return (
    <Stack
      screenOptions={{
        header: (props) => {
          const currentScreen = props.route.name;
          const isLastStep = currentScreen === 'certificates';
          console.log('💫💫💫 CurrentScreen', currentScreen);

          return (
            <SafeAreaView className="bg-white px-4" edges={['top']}>
              <View className="flex-row items-center justify-between">
                <Button variant="link" className="p-0" onPress={goBack}>
                  <ButtonText className="">Back</ButtonText>
                </Button>

                <Typography weight={500} className="capitalize text-[#0B0B0B]">
                  {props.options.title}
                </Typography>

                <Button
                  variant="link"
                  className="p-0"
                  onPress={() => {
                    goNext(currentScreen);
                  }}
                >
                  <ButtonText className="">
                    {isLastStep ? 'Done' : 'Next'}
                  </ButtonText>
                </Button>
              </View>

              <View className="mb-[16px] flex-row gap-2">
                {Array.from({ length: 6 }).map((_, index) => {
                  return <Step key={index} />;
                })}
              </View>
            </SafeAreaView>
          );
        },
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
