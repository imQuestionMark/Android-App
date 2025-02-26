import { createQuery } from 'react-query-kit';
import { z } from 'zod';

import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export type Variables = void;

const locationSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const locationResponseSchema = z.object({
  items: z.array(locationSchema),
});

type Response = z.infer<typeof locationResponseSchema>;

const fetchLocations = async () => {
  const response = await client.get(API_ROUTES.LOCATION.GET);
  return locationResponseSchema.parse(response.data);
};

export const useLocations = createQuery<Response, Variables, Error>({
  queryKey: ['locations'],
  fetcher: fetchLocations,
});
