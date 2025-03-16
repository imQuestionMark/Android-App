import { type StateCreator } from 'zustand';

import { showError } from '@/components/ui';

import {
  getItem,
  getItemSecurely,
  removeItemSecurely,
  setItem,
  setItemSecurely,
} from '../storage';
import { devLog } from '../utils';

const _TOKEN_KEY = 'GRID_TOKEN';
const _ONBOARDING_STEP_KEY = 'GRID_ONBOARDING_STEP';
const _ONBOARDING_COMPLETED = 99999;
const _ONBOARDING_UNSTARTED = -1;

const handleError = (error: unknown, msg: string) => {
  return showError(error instanceof Error ? error : new Error(msg));
};

type AuthState = {
  onboardingStep: number; // Tracks progress (-1 = not started, 9999 = completed)
  status: 'authenticated' | 'idle' | 'unauthenticated';
  token: null | string;
  totalSteps: number;
};

type AuthActions = {
  completeOnboarding: () => void;
  decrementOnboarding: () => void;
  hydrate: () => Promise<void>;
  incrementOnboarding: () => void;
  resetOnboarding: () => void;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateOnboarding: (step: number) => void;
};

type AuthSlice = AuthActions & AuthState;

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
  get
) => ({
  // Initial state
  status: 'idle',
  token: null,
  onboardingStep: _ONBOARDING_UNSTARTED,
  totalSteps: 2,

  // actions
  async signIn(token: string) {
    try {
      devLog('Sign In Token:', token);

      await setItemSecurely(_TOKEN_KEY, token);
      set({ status: 'authenticated', token });
    } catch (e) {
      handleError(e, 'Failed to sign in');
      get().signOut();
      throw e;
    }
  },

  async signOut() {
    try {
      await removeItemSecurely(_TOKEN_KEY);
      get().resetOnboarding();
      devLog('Signing out');
    } catch (e) {
      handleError(e, 'Failed to sign out');
      throw e;
    } finally {
      set({ status: 'unauthenticated', token: null });
    }
  },

  async hydrate() {
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
    } catch (e) {
      handleError(e, 'Failed to restore session');
      get().signOut();
      throw e;
    }
  },

  decrementOnboarding() {
    try {
      const currentStep = get().onboardingStep;
      if (currentStep <= _ONBOARDING_UNSTARTED) return;

      const newStep = currentStep - 1;
      devLog(`Onboarding step decremented to: ${newStep}`);

      setItem(_ONBOARDING_STEP_KEY, newStep);
      set({ onboardingStep: newStep });
    } catch (e) {
      handleError(e, 'Failed to decrement onboarding step');
      throw e;
    }
  },

  incrementOnboarding() {
    try {
      const currentStep = get().onboardingStep;
      if (currentStep >= _ONBOARDING_COMPLETED) return;

      const newStep = currentStep + 1;
      devLog(`Onboarding step incremented to: ${newStep}`);

      setItem(_ONBOARDING_STEP_KEY, newStep);
      set({ onboardingStep: newStep });
    } catch (e) {
      handleError(e, 'Failed to increment onboarding step');
      throw e;
    }
  },

  updateOnboarding(step: number) {
    try {
      devLog(`Onboarding step updated: ${step}`);

      setItem(_ONBOARDING_STEP_KEY, step);
      set({ onboardingStep: step });
    } catch (e) {
      handleError(e, 'Failed to update onboarding step');
      throw e;
    }
  },

  resetOnboarding() {
    try {
      devLog('Onboarding progress reset to unSTARTED');

      setItem(_ONBOARDING_STEP_KEY, _ONBOARDING_UNSTARTED);
      set({ onboardingStep: _ONBOARDING_UNSTARTED });
    } catch (e) {
      handleError(e, 'Failed to reset onboarding progress');
    }
  },

  completeOnboarding() {
    try {
      setItem(_ONBOARDING_STEP_KEY, _ONBOARDING_COMPLETED);
      devLog('Onboarding completed');
      set({ onboardingStep: _ONBOARDING_COMPLETED });
    } catch (e) {
      handleError(e, 'Failed to complete onboarding');
    }
  },
});
