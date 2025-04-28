import { updateTaskUseCase } from "../../../main";
import type { UpdateTaskInput } from "../../core/use-cases/UpdateTask";

export async function updateTask(input: UpdateTaskInput) {
  return await updateTaskUseCase.execute(input);
}