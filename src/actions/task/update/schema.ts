import { z } from "zod";

export const updateTaskInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  completed: z.boolean().optional(),
  dueDate: z.coerce.date().optional(),
});