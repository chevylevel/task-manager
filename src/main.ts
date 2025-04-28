import { PrismaClient } from '@prisma/client';
import { CreateTask } from "./app/core/use-cases/CreateTask";
import { PrismaTaskRepository } from "./app/infrastructure/repositories/PrismaTaskRepository";
import { GetTasks } from './app/core/use-cases/GetTasks';
import { GetTaskById } from './app/core/use-cases/GetTaskById';
import { DeleteTask } from './app/core/use-cases/DeleteTask';
import { UpdateTask } from './app/core/use-cases/UpdateTask';
import { FilterTasks } from './app/core/use-cases/FilterTasks';

const prisma = new PrismaClient();
const taskRepository = PrismaTaskRepository.getInstance(prisma);

export const getTasksUseCase = new GetTasks(taskRepository);
export const createTaskUseCase = new CreateTask(taskRepository);
export const deleteTaskUseCase = new DeleteTask(taskRepository);
export const getTaskByIdUseCase = new GetTaskById(taskRepository);
export const updateTaskUseCase = new UpdateTask(taskRepository);
export const filterTasksUseCase = new FilterTasks(taskRepository);