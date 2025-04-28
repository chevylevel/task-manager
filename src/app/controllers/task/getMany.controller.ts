import { filterTasksUseCase, getTasksUseCase } from "../../../main";
import type { TaskFilterParams } from "../../core/use-cases/FilterTasks";

export async function getTasks(filter?: TaskFilterParams) {
  const { tasks, count } = filter
    ? await filterTasksUseCase.execute(filter)
    : await getTasksUseCase.execute();

  return { tasks, count };
}