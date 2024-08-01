import { z } from 'zod';

export const requestParams = z.object({
  id: z.string().uuid(),
});

export type RequestParams = z.infer<typeof requestParams>;
