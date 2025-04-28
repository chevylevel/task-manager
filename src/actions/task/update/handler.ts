import type { z } from "zod";
import { updateTask } from "../../../app/controllers/task/update.controller";
import type { deleteTaskInputSchema } from "../delete";

export const handleUpdateTask = async (input: z.infer<typeof deleteTaskInputSchema>) => {
  try {
    const task = await updateTask(input);

    return { success: true, task };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "UpdateTask error"
    };
  }
}