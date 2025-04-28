import type { CreateTaskInput } from "../../core/use-cases/CreateTask";
import { createTaskUseCase } from "../../../main";

export type CreateTaskUserInput = unknown;

export async function createTask(input: CreateTaskUserInput) {
  return await createTaskUseCase.execute(input as CreateTaskInput);
}