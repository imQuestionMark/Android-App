import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';

import { showError } from '@/components/ui';

import { createSelectors, devLog } from '../utils';

const USER_ID_KEY = 'GRID_USER_ID';
const USER_NAME_KEY = 'GRID_USER_NAME';

type UserState = {
  firstName: string;
  getFirstName: () => Promise<null | string>;
  getUserID: () => Promise<null | string>;
  removeFirstName: () => Promise<void>;
  removeUserID: () => Promise<void>;
  saveFirstName: (firstName: string) => Promise<void>;
  saveUserID: (userID: string) => Promise<void>;
  userID: null | string;
};

const secureStore = {
  getUser: () => getItemAsync(USER_ID_KEY),
  setUser: (userID: string) => setItemAsync(USER_ID_KEY, userID),
  removeUser: () => deleteItemAsync(USER_ID_KEY),

  getFirstName: () => getItemAsync(USER_NAME_KEY),
  setFirstName: (firstName: string) => setItemAsync(USER_NAME_KEY, firstName),
  removeFirstName: () => deleteItemAsync(USER_NAME_KEY),
} as const;

const _useUserStore = create<UserState>((set) => ({
  userID: null,
  firstName: 'User',

  saveUserID: async (userID: string) => {
    try {
      await secureStore.setUser(userID);
      devLog('User ID saved:', userID);
      set({ userID });
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to save user ID')
      );
    }
  },

  getUserID: async () => {
    try {
      const userID = await secureStore.getUser();
      devLog('Retrieved User ID:', userID);
      if (userID) set({ userID });
      return userID ?? null;
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to retrieve user ID')
      );
      return null;
    }
  },

  removeUserID: async () => {
    try {
      await secureStore.removeUser();
      devLog('User ID removed');
      set({ userID: null });
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to remove user ID')
      );
    }
  },

  saveFirstName: async (firstName: string) => {
    try {
      await secureStore.setFirstName(firstName);
      devLog('First Name saved:', firstName);
      set({ firstName });
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to save first name')
      );
    }
  },

  getFirstName: async () => {
    try {
      const firstName = await secureStore.getFirstName();
      devLog('Retrieved First Name:', firstName);
      if (firstName) set({ firstName });
      return firstName ?? null;
    } catch (error) {
      showError(
        error instanceof Error
          ? error
          : new Error('Failed to retrieve first name')
      );
      return null;
    }
  },

  removeFirstName: async () => {
    try {
      await secureStore.removeFirstName();
      devLog('First Name removed');
      set({ firstName: 'User' });
    } catch (error) {
      showError(
        error instanceof Error
          ? error
          : new Error('Failed to remove first name')
      );
    }
  },
}));

export const useUserStore = createSelectors(_useUserStore);

// @INFO use these only outside of React components.
export const saveUserID = (userID: string) =>
  _useUserStore.getState().saveUserID(userID);
export const getUserID = () => _useUserStore.getState().getUserID();
export const removeUserID = () => _useUserStore.getState().removeUserID();

export const saveFirstName = (firstName: string) =>
  _useUserStore.getState().saveFirstName(firstName);
export const getFirstName = () => _useUserStore.getState().getFirstName();
export const removeFirstName = () => _useUserStore.getState().removeFirstName();
