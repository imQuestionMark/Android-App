import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

/**
 * Logs messages only in development mode.
 * If an object is passed, it prettifies the JSON.
 */
export const devLog = (label: string, data?: unknown) => {
  if (__DEV__) {
    const message =
      typeof data === 'object' && data !== null
        ? JSON.stringify(data, null, 2)
        : data;

    console.log(`${label}`, message || '');
  }
};
