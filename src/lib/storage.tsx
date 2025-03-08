import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export async function getItemSecurely(key: string) {
  return await getItemAsync(key);
}

export async function setItemSecurely<T>(key: string, value: string) {
  await setItemAsync(key, value);
}

export async function removeItemSecurely(key: string) {
  await deleteItemAsync(key);
}
