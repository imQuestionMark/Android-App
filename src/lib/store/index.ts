import { create } from 'zustand';
import { withSlices } from 'zustand-slices';

import bottomNavSlice from './bottom-nav.slice';

const useAppStore = create(withSlices(bottomNavSlice));

export default useAppStore;
