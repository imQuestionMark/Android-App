import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

import { devLog } from './utils';

export const storage = new MMKV();

export function getItem<T>(key: string): null | T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}
export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  storage.delete(key);
}

export async function getItemSecurely(key: string) {
  try {
    return await getItemAsync(key);
  } catch (error) {
    devLog(`Error retrieving ${key} from secure storage:`, error);
  }
}

export async function setItemSecurely(key: string, value: string) {
  await setItemAsync(key, value);
}

export async function removeItemSecurely(key: string) {
  await deleteItemAsync(key);
}
