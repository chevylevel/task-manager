import { z } from "zod";

export const createTaskInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.coerce.date(),
});