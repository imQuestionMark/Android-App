import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createAuthSlice } from './auth.v2.slice';
import createBottomNavSlice from './bottom-nav.v2.slice';

type SharedStore = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createBottomNavSlice>;

const useBoundStore = create<SharedStore>()(
  devtools((...a) => ({
    ...createBottomNavSlice(...a),
    ...createAuthSlice(...a),
  }))
);

export default useBoundStore;

export const hydrateAuth = () => useBoundStore.getState().hydrate();
