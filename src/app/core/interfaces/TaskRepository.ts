import type { Task } from "../entities/Task";
import type { CreateTaskInput } from "../use-cases/CreateTask";
import type { TaskFilterParams } from "../use-cases/FilterTasks";
import type { UpdateTaskInput } from "../use-cases/UpdateTask";

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: number): Promise<Task | null>;
  create(task: CreateTaskInput): Promise<Task>;
  update(input: UpdateTaskInput): Promise<Task>;
  delete(id: number): Promise<Task>;
  filter(filter: TaskFilterParams): Promise<Task[]>;
}
