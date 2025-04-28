import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export class GetTasks {
  constructor(private readonly repo: TaskRepository) { }

  async execute(): Promise<Task[]> {
    return this.repo.getAll();
  }
}
