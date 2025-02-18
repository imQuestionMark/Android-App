import { AxiosError } from 'axios';
import { toast } from 'sonner-native';
import { ZodError } from 'zod';

const getAxiosErrorMessage = (error: AxiosError) => {
  if (error.response) return extractError(error?.response?.data).trimEnd();

  // default return
  return error.message;
};

const getZodErrorMessage = (error: ZodError) =>
  Object.values(error.flatten().fieldErrors).flat().join(', ');

// for onError react queries and mutations
export const showError = (error: Error) => {
  let description = 'Something went wrong 😔';

  if (error instanceof AxiosError) {
    console.warn('🪓🪓🪓 Axios Error');
    description = getAxiosErrorMessage(error);
  }
  if (error instanceof ZodError) {
    console.warn('🏹🏹🏹 Zod Validation Error');
    description = getZodErrorMessage(error);
  }

  toast.error('Error', {
    description,
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
