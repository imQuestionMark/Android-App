import { showError } from '@/components/ui';
import { client } from '../common';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { router, useRouter } from 'expo-router';
import { z } from 'zod';


export const CtcInputschema = z.object({
  ctc: z
    .string()
    .min(1, { message: 'CTC is required' })
});

export type Variables = z.infer<typeof CtcInputschema>;
