import { create } from 'zustand';

import { createSelectors } from '../utils';

type PersonalState = {
  dob: string;
  updateDOB: (dob: string) => void;
};

export const _personalStore = create<PersonalState>((set) => ({
  dob: '',
  updateDOB: (dob) => {
    set({ dob });
  },
}));

export const usePersonalStore = createSelectors(_personalStore);
