import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export type UpdateTaskInput = Partial<Omit<Task, 'id'>> & { id: number }; 

export class UpdateTask {
  constructor(private readonly repo: TaskRepository) { }

  async execute(input: UpdateTaskInput): Promise<Task> {
    return this.repo.update(input);
  }
}
