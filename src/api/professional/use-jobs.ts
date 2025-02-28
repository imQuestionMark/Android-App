import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { z } from 'zod';

import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

const jobItem = z.object({
  id: z.string(),
  label: z.string(),
});

const jobResponseSchema = z.object({
  items: z.array(jobItem),
});

type Response = z.infer<typeof jobResponseSchema>;
type Variables = void;

const fetchJobs = async () => {
  const response = await client.get(API_ROUTES.JOB_ROLES.GET);
  return jobResponseSchema.parse(response.data.data);
};

export const useJobs = createQuery<Response, Variables, AxiosError>({
  queryKey: ['jobs'],
  fetcher: fetchJobs,
});
