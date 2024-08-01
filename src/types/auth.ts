import { z } from 'zod';

export const authRequestBody = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1),
});

export type authRequestBody = z.infer<typeof authRequestBody>;
