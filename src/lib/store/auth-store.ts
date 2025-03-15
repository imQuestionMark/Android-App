import { create } from 'zustand';

import { showError } from '@/components/ui';

import {
  getItem,
  getItemSecurely,
  removeItemSecurely,
  setItem,
  setItemSecurely,
} from '../storage';
import { createSelectors, devLog } from '../utils';

const _TOKEN_KEY = 'GRID_TOKEN';
const _ONBOARDING_STEP_KEY = 'GRID_ONBOARDING_STEP';
const _ONBOARDING_COMPLETED = 99999;
const _ONBOARDING_UNSTARTED = -1;

const handleError = (error: unknown, msg: string) => {
  return showError(error instanceof Error ? error : new Error(msg));
};

type AuthState = {
  completeOnboarding: () => Promise<void>;
  hydrate: () => Promise<void>;
  onboardingStep: number; // Tracks progress (-1 = not started, 9999 = completed)

  resetOnboarding: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;

  status: 'authenticated' | 'idle' | 'unauthenticated';
  token: null | string;
  updateOnboarding: (step: number) => Promise<void>;
};

const _auth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  onboardingStep: _ONBOARDING_UNSTARTED,

  signIn: async (token: string) => {
    try {
      devLog('Sign In Token:', token);

      await setItemSecurely(_TOKEN_KEY, token);
      set({ status: 'authenticated', token });
    } catch (e) {
      handleError(e, 'Failed to sign in');
      get().signOut();
    }
  },

  signOut: async () => {
    try {
      await removeItemSecurely(_TOKEN_KEY);
      get().resetOnboarding();
      devLog('Signing out');
    } catch (e) {
      handleError(e, 'Failed to sign out');
    } finally {
      set({ status: 'unauthenticated', token: null });
    }
  },

  hydrate: async () => {
    try {
      const token = await getItemSecurely(_TOKEN_KEY);
      const storedStep = getItem<number>(_ONBOARDING_STEP_KEY);
      const onboardingStep =
        storedStep !== null && storedStep !== undefined
          ? storedStep
          : _ONBOARDING_UNSTARTED;

      devLog('Hydrating:', { token, onboardingStep });
      if (!token) return get().signOut();

      set({ token, onboardingStep, status: 'authenticated' });

      // await get().signIn(token);
      // await get().updateOnboarding(onboardingStep);
    } catch (e) {
      handleError(e, 'Failed to restore session');
      get().signOut();
    }
  },

  updateOnboarding: async (step: number) => {
    try {
      devLog(`Onboarding step updated: ${step}`);

      await setItem(_ONBOARDING_STEP_KEY, step);
      set({ onboardingStep: step });
    } catch (e) {
      handleError(e, 'Failed to update onboarding step');
    }
  },

  resetOnboarding: async () => {
    try {
      devLog('Onboarding progress reset to unSTARTED');

      await setItem(_ONBOARDING_STEP_KEY, _ONBOARDING_UNSTARTED);
      set({ onboardingStep: _ONBOARDING_UNSTARTED });
    } catch (e) {
      handleError(e, 'Failed to reset onboarding progress');
    }
  },

  completeOnboarding: async () => {
    try {
      await setItem(_ONBOARDING_STEP_KEY, _ONBOARDING_COMPLETED);
      devLog('Onboarding completed');
      set({ onboardingStep: _ONBOARDING_COMPLETED });
    } catch (e) {
      handleError(e, 'Failed to complete onboarding');
    }
  },
}));

export const useAuth = createSelectors(_auth);

// @INFO use these only when needed outside of React components.
export const signOut = () => _auth.getState().signOut();
export const signIn = (token: string) => _auth.getState().signIn(token);
export const hydrateAuth = () => _auth.getState().hydrate();

export const updateOnboarding = (step: number) =>
  _auth.getState().updateOnboarding(step);
export const resetOnboarding = () => _auth.getState().resetOnboarding();
export const completeOnboarding = () => _auth.getState().completeOnboarding();
