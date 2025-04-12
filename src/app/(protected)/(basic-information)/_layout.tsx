import { getHeaderTitle, Header } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { type ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Step from '@/components/ui/step';
import { useWallStore } from '@/lib/store/wall.slice';

const BasicInfoStackLayout = () => {
  const currentStepIndex = useWallStore((s) => s.currentStepIndex);
  const screenOrder = useWallStore((s) => s.screenOrder);
  const insets = useSafeAreaInsets();

  const headerHeight = insets.top + 25;

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 16,
            color: 'black',
            fontFamily: 'Poppins-Medium',
            fontWeight: 500,
          },
          header: ({ options, route, back }) => (
            <Header
              {...options}
              back={back}
              headerStyle={{
                height: headerHeight,
                backgroundColor: 'white',
              }}
              title={getHeaderTitle(options, route.name)}
            />
          ),
          animation: 'fade_from_bottom',
        }}
        screenLayout={(props) => (
          <CommonLayout
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
    </>
  );
};

export default BasicInfoStackLayout;

const CommonLayout = ({
  children,
  currentStepIndex,
  screenOrder,
}: {
  children: ReactNode;
  currentStepIndex: number;
  screenOrder: string[];
}) => {
  return (
    <View className="flex-1 bg-white px-4">
      <View className="mb-[16px] mt-2 flex-row gap-2">
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
