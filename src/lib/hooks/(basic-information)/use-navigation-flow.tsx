import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router';
import { useCallback, useEffect } from 'react';

import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BASE_PATH = '(protected)/(basic-information)';

export function useNavigationFlow() {
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();

  const currentScreen = pathname.slice(1) as WallScreen;
  const isLastStep = currentScreen === 'achievement';

  const { setCurrentStep, getPreviousScreen, getNextScreen } = useWallStore(
    (s) => s.actions
  );

  useFocusEffect(
    useCallback(() => {
      console.log('🏹 FIRING USE FOCUS EFFECT++++');
      setCurrentStep(currentScreen);
    }, [currentScreen, setCurrentStep])
  );

  const goBack = useCallback(() => {
    const prev = getPreviousScreen(currentScreen);
    if (prev) return router.push({ pathname: `/${BASE_PATH}/${prev}` });

    router.replace({ pathname: '/wall' });
  }, [currentScreen, getPreviousScreen, router]);

  const goNext = useCallback(() => {
    if (isLastStep) return router.replace({ pathname: '/wall' });

    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) router.push({ pathname: `/${BASE_PATH}/${nextScreen}` });
  }, [currentScreen, getNextScreen, isLastStep, router]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BasicHeaderButton label="Back" onPress={goBack} />,
      headerRight: () => (
        <BasicHeaderButton
          label={isLastStep ? 'Done' : 'Next'}
          onPress={goNext}
        />
      ),
    });
  }, [goBack, goNext, isLastStep, navigation]);
}
