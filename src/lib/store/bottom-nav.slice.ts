import { createSlice } from 'zustand-slices';

export const bottomNavSlice = createSlice({
  name: 'bottomNav',
  value: {
    handler: () => {},
  },
  actions: {
    setHandler: (newHandler: () => void) => () => ({
      handler: newHandler,
    }),
    resetHandler: () => () => ({
      handler: () => {},
    }),
  },
});

export default bottomNavSlice;
