import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export type CreateTaskInput = Omit<Task, 'id' | 'completed'>; 

export class CreateTask {
  constructor(private readonly repo: TaskRepository) { }

  async execute(input: CreateTaskInput): Promise<Task> {
    return this.repo.create(input);
  }
}
