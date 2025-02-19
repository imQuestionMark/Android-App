// import type { AxiosError } from 'axios';
// import { router } from 'expo-router';
// import { createMutation } from 'react-query-kit';
// import { z } from 'zod';

// import { showError } from '@/components/ui';

// import { client } from '../common';

// export const CtcInputschema = z.object({
//   ctc: z.string().min(1, { message: 'CTC is required' }),
// });

// export type profctcInput = z.infer<typeof CtcInputschema>;

// const CtcResponseschema = z.object({
//   status: z.number(),
//   message: z.string(),
// });

// type profctcRes = z.infer<typeof CtcResponseschema>;

// export const ExctcInputschema = z.object({
//   expctc: z.string().min(1, { message: 'CTC is required' }),
// });

// export type profexctcInput = z.infer<typeof ExctcInputschema>;

// const ExctcResponseschema = z.object({
//   status: z.number(),
//   message: z.string(),
// });

// type profexctcRes = z.infer<typeof ExctcResponseschema>;
