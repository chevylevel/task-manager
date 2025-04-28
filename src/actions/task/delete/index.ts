import { defineAction } from "astro:actions";
import { deleteTaskInputSchema } from "./schema";
import { handleDeleteTask } from "./handler";

export const deleteAction = defineAction({
  accept: 'form',
  input: deleteTaskInputSchema,
  handler: handleDeleteTask,
})