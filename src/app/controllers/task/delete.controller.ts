import type { DeleteTaskParams } from "../../core/use-cases/DeleteTask";
import { deleteTaskUseCase } from "../../../main";

export async function deleteTask(params: DeleteTaskParams) {
  return await deleteTaskUseCase.execute(params);
}