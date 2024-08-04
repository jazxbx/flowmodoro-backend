import { z } from 'zod';

export const taskTimeRequestBody = z.object({
  started: z.string().datetime(),
  ended: z.string().datetime().optional().optional(),
  // duration: z.number(),
  taskId: z.string().uuid(),
});

export type taskTimeRequestBody = z.infer<typeof taskTimeRequestBody>;
