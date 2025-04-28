import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { updateTask } from "../../../app/controllers/task/update.controller";

export const updateAction = defineAction({
  accept: "form",
  input: z.object({
    id: z.number(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    completed: z.boolean().optional(),
    dueDate: z.coerce.date().optional(),
  }),
  handler: async (input) => {
    try {
      const task = await updateTask(input);

      return { success: true, task };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
});