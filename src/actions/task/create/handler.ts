import type { z } from "zod";
import { createTask } from "../../../app/controllers/task/create.controller";
import type { createTaskInputSchema } from "./schema";

export async function handleCreateTask(input: z.infer<typeof createTaskInputSchema>) {
  try {
    const task = await createTask(input);
    return { success: true, task };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "CreateTask error"
    };
  }
}