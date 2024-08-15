import { z } from 'zod';

export const tasksSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(50).optional(),
  date: z.date(),
  completed: z.boolean(),
});

export const tasksRequestBody = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(50).nullable(),
  completed: z.boolean(),
});

export type tasksSchema = z.infer<typeof tasksSchema>;
export type tasksRequestBody = z.infer<typeof tasksRequestBody>;
