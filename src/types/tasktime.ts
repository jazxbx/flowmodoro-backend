import { z } from 'zod';

export const taskTimeRequestBody = z.object({
  taskId: z.string().uuid(),
  started: z.string().datetime(),
  ended: z.string().datetime(),
  duration: z.number(),
});

export type taskTimeRequestBody = z.infer<typeof taskTimeRequestBody>;
