import { z } from 'zod';

export const goalsRequestBody = z.object({
  userId: z.string(),
  goalTime: z.number(),
});

export type goalsRequestBody = z.infer<typeof goalsRequestBody>;
