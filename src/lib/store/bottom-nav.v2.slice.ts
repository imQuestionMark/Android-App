import { type StateCreator } from 'zustand';

type BottomNavState = {
  handler: () => void;
};

type BottomNavActions = {
  resetHandler: () => void;
  setHandler: (newHandler: () => void) => void;
};

const _NOOP = () => {};

export type BottomNavSlice = BottomNavActions & BottomNavState;

export const createBottomNavSlice: StateCreator<
  BottomNavSlice,
  [],
  [],
  BottomNavSlice
> = (set) => ({
  handler: _NOOP,

  setHandler: (newHandler) => {
    set({
      handler: newHandler,
    });
  },

  resetHandler: () => {
    set({
      handler: _NOOP,
    });
  },
});

export default createBottomNavSlice;
