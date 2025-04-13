import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { z } from 'zod';

import { client } from '@/api/common';
import { API_ROUTES } from '@/routes/api-routes';

const jobItem = z.object({
  designation: z.string(),
  location: z.array(z.string()),
  isActive: z.boolean(),
  jobType: z.string(),
  workMode: z.string(),
  skillsRequired: z.array(z.string()),
  recruiterId: z.string(),
  minExperience: z.number(),
  maxExperience: z.number(),
  salary: z.string(),
  jobDescription: z.string(),
  noticePeriod: z.string(),
  check: z.number(),
  _id: z.string(),
});

const jobResponseSchema = z.object({
  items: z.array(jobItem),
});

export type TJob = z.infer<typeof jobItem>;

export type TJobResponse = z.infer<typeof jobResponseSchema>;
type Variables = void;

const fetchJobs = async () => {
  const response = await client.get(API_ROUTES.JOB.GET);
  return jobResponseSchema.parse(response.data.data);
};

export const useRolesQuery = createQuery<TJobResponse, Variables, AxiosError>({
  queryKey: ['jobs'],
  fetcher: fetchJobs,
  retry: false,
});
