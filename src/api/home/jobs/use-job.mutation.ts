import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '@/api/common';

type Variables = {};
type Response = {};

export const useJobMutation = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
