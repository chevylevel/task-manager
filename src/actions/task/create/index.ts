import { defineAction } from "astro:actions";
import { createTaskInputSchema } from "./schema";
import { handleCreateTask } from "./handler";

export const createAction = defineAction({
  accept: "form",
  input: createTaskInputSchema,
  handler: handleCreateTask,
});