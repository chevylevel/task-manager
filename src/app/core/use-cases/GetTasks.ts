import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export interface TasksResult {
  tasks: Task[];
  count: number;
}

export class GetTasks {
  constructor(private readonly repo: TaskRepository) { }

  async execute(): Promise<TasksResult> {
    return this.repo.getAll();
  }
}
