import { create } from 'zustand';

import { createSelectors } from '../utils';

type OnboardingStatus = 'personal' | 'professional';

interface OnboardingState {
  completed: boolean;
  current: 1 | 2 | null;
  markCompleted: () => void;
  status: OnboardingStatus;
  totalPages: 2;
  updateStatus: (status: OnboardingStatus) => void;
}

export const _onboardingStore = create<OnboardingState>((set) => ({
  completed: false,
  status: 'personal',
  totalPages: 2,
  current: null,

  updateStatus: (status) => {
    set({ status });
  },

  markCompleted: () => {
    set({ completed: true });
  },
}));

export const useOnboardingStore = createSelectors(_onboardingStore);
