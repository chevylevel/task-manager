import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export type DeleteTaskParams = { id: number };

export class DeleteTask {
  constructor(private readonly repo: TaskRepository) { }

  async execute({ id }: DeleteTaskParams): Promise<Task> {
    return this.repo.delete(id);
  }
}
