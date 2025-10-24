import { z } from 'zod';

export const createCourseSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  level: z.string().optional(),
  duration: z.number().int().nonnegative().optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;
