import { z } from 'zod';

export const taskTimesRequestBody = z.object({
  started: z.string().datetime(),
  ended: z.string().datetime().optional().optional(),
  duration: z.number(),
  taskId: z.string().uuid(),
});

export type taskTimesRequestBody = z.infer<typeof taskTimesRequestBody>;
