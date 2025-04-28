import type { TaskPriority } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";
import type { TasksResult } from "./GetTasks";

export type TaskFilterParams = {
  priority?: TaskPriority;
  completed?: boolean;
}

export class FilterTasks {
  constructor(private readonly repo: TaskRepository) { }

  async execute(filter: TaskFilterParams): Promise<TasksResult> {
    return this.repo.filter(filter);
  }
}
