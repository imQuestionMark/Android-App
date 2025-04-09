import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BASE_PATH = '(protected)/(basic-information)';

export function useWallNavigationFlow() {
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
    if (prev) return router.dismissTo({ pathname: `/${BASE_PATH}/${prev}` });

    router.dismissTo({ pathname: '/wall/upload-details' });
  }, [currentScreen, getPreviousScreen, router]);

  const goNext = useCallback(() => {
    if (isLastStep)
      return router.dismissTo({ pathname: '/wall/upload-details' });

    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) router.push({ pathname: `/${BASE_PATH}/${nextScreen}` });
  }, [currentScreen, getNextScreen, isLastStep, router]);

  const backAction = useCallback(() => {
    console.log('Trapped Back Handler');
    goBack();
    return true;
  }, [goBack]);

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

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction, goBack, goNext, isLastStep, navigation]);
}
