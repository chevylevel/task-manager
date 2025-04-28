import type { Task, TaskPriority } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export type TaskFilterParams = {
  priority?: TaskPriority;
  completed?: boolean;
}

export class FilterTasks {
  constructor(private readonly repo: TaskRepository) { }

  async execute(filter: TaskFilterParams): Promise<Task[]> {
    return this.repo.filter(filter);
  }
}
