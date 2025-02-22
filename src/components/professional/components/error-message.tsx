import { type FieldError } from 'react-hook-form';
import { Text } from 'react-native';

export const ErrorMessage = ({ error }: { error?: FieldError }) => {
  return (
    error && <Text className="mt-1 text-sm text-red-500">{error.message}</Text>
  );
};
