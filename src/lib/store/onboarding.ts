import { create } from 'zustand';

import { createSelectors } from '../utils';

type OnboardingStatus = 'finished' | 'idle' | 'pending';
type CurrentStatus = 0 | 1;

interface OnboardingState {
  completed: boolean;
  currentPage: CurrentStatus;
  markCompleted: () => void;
  status: OnboardingStatus;
  totalPages: 2;
  updateCurrentPage: (current: CurrentStatus) => void;
  updateStatus: (status: OnboardingStatus) => void;
}

export const _onboardingStore = create<OnboardingState>((set) => ({
  completed: false,
  status: 'idle',
  currentPage: 0,
  totalPages: 2,

  updateStatus: (status) => {
    set({ status });
  },

  updateCurrentPage: (currentPage: CurrentStatus) => {
    set({ currentPage });
  },

  markCompleted: () => {
    set({ completed: true });
  },
}));

export const useOnboardingStore = createSelectors(_onboardingStore);
