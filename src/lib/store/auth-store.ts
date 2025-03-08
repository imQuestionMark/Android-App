import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { create } from 'zustand';

import { showError } from '@/components/ui';

import { createSelectors, devLog } from '../utils';

const TOKEN_KEY = 'GRID_TOKEN';

export type AuthStatus = 'authenticated' | 'idle' | 'unauthenticated';

type AuthState = {
  hydrate: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  status: AuthStatus;
  token: null | string;
};

const secureStore = {
  get: () => getItemAsync(TOKEN_KEY),
  set: (token: string) => setItemAsync(TOKEN_KEY, token),
  remove: () => deleteItemAsync(TOKEN_KEY),
} as const;

const _useAuthStore = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  userID: null,

  signIn: async (token: string) => {
    try {
      await secureStore.set(token);
      devLog('Sign In Token:', token);
      set({ status: 'authenticated', token });
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to sign in')
      );
      get().signOut();
    }
  },

  signOut: async () => {
    try {
      await secureStore.remove();
      devLog('Signing out', '');
      set({ status: 'unauthenticated', token: null });
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to sign out')
      );
      set({ status: 'unauthenticated', token: null });
    }
  },

  hydrate: async () => {
    try {
      const token = await secureStore.get();
      devLog('Hydrating:', token);

      if (!token) return get().signOut();

      await get().signIn(token);
    } catch (error) {
      showError(
        error instanceof Error ? error : new Error('Failed to restore session')
      );
      get().signOut();
    }
  },
}));

export const useAuth = createSelectors(_useAuthStore);

// @INFO use this only when you need to access these methods outside of React components.
export const signOut = () => _useAuthStore.getState().signOut();
export const signIn = (token: string) => _useAuthStore.getState().signIn(token);
export const hydrateAuth = () => _useAuthStore.getState().hydrate();
