import { z } from 'zod';

export const userRequest = z.object({
  id: z.string().uuid(),
});

export type userRequest = z.infer<typeof userRequest>;
