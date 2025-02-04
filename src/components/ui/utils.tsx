import type { AxiosError } from 'axios';
import { Dimensions, Platform } from 'react-native';
import { toast } from 'sonner-native';

export const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
  const description = extractError(error?.response?.data).trimEnd();

  toast.error('Error', {
    description: error?.response?.data?.message,
    duration: 4000,
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  toast.error(message, {
    duration: 4000,
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};
