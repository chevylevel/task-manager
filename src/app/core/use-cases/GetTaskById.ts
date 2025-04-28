import type { Task } from "../entities/Task";
import type { TaskRepository } from "../interfaces/TaskRepository";

export type GetTaskByIdParams = {
  id: number;
}

export class GetTaskById {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({id }: GetTaskByIdParams): Promise<Task | null> {
    return await this.taskRepository.getById(id);
  }
}