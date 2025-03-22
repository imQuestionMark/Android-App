import { create } from 'zustand';

export type WallScreen =
  | 'achievement'
  | 'basic-info'
  | 'certificates'
  | 'education'
  | 'experience'
  | 'links'
  | 'projects'
  | 'skills';

type WallState = {
  currentStepIndex: number;
  getNextScreen: (currentScreen: WallScreen) => null | WallScreen;
  getPreviousScreen: (currentScreen: WallScreen) => null | WallScreen;
  screenOrder: WallScreen[];
  setCurrentStep: (screenName: WallScreen) => void;
};

export const useWallStore = create<WallState>((set, get) => ({
  currentStepIndex: 0,
  screenOrder: [
    'basic-info',
    'links',
    'education',
    'experience',
    'projects',
    'certificates',
    'skills',
    'achievement',
  ],
  setCurrentStep: (screenName) => {
    const screenOrder = get().screenOrder;
    const index = screenOrder.indexOf(screenName);

    if (index !== -1) {
      set({ currentStepIndex: index });
    }
  },
  getNextScreen: (currentScreen) => {
    const screenOrder = get().screenOrder;
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex !== -1 && currentIndex < screenOrder.length - 1) {
      return screenOrder[currentIndex + 1];
    }
    return null;
  },
  getPreviousScreen: (currentScreen) => {
    const screenOrder = get().screenOrder;
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex > 0) {
      return screenOrder[currentIndex - 1];
    }
    return null;
  },
}));
