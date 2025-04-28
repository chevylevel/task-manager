import { getTaskByIdUseCase } from "../../../main";
import type { GetTaskByIdParams } from "../../core/use-cases/GetTaskById";

export async function getOneTaskById(params: GetTaskByIdParams) {
  return await getTaskByIdUseCase.execute(params);
}