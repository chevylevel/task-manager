import { z } from "zod";
import { deleteTask } from "../../../app/controllers/task/delete.controller";
import type { deleteTaskInputSchema } from "./schema";

export const handleDeleteTask = async (input: z.infer<typeof deleteTaskInputSchema>) => {
  try {
    const task = await deleteTask(input);

    return { success: true, task };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "DeleteTask error"
    };
  }
}