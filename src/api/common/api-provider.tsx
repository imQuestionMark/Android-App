import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { type ReactNode } from 'react';

import { showError } from '@/components/ui';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error) {
      showError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError(error) {
      console.log('Global Mutation Error Handling');
      showError(error);
    },
  }),
});

export function APIProvider({ children }: { children: ReactNode }) {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
