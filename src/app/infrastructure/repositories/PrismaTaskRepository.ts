import type { PrismaClient } from "@prisma/client";

import type { Task } from "../../core/entities/Task";
import type { CreateTaskInput } from "../../core/use-cases/CreateTask";
import type { TaskRepository } from "../../core/interfaces/TaskRepository";
import { toDomainTask } from '../mappers/toDomainTask';
import type { UpdateTaskInput } from '../../core/use-cases/UpdateTask';
import type { TaskFilterParams } from "../../core/use-cases/FilterTasks";

let instance: PrismaTaskRepository | null = null;

export class PrismaTaskRepository implements TaskRepository {
  private constructor(private prisma: PrismaClient) {}

  static getInstance(prisma: PrismaClient): PrismaTaskRepository {
    if (!instance) {
      instance = new PrismaTaskRepository(prisma);
    }
    
    return instance;
  }

  async create(taskInput: CreateTaskInput): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        ...taskInput,
      },
    });
    return toDomainTask(task);
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();

    return tasks.map((task: Task) => toDomainTask(task));
  }

  async getById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    return task ? toDomainTask(task) : null;
  }

  async update(input: UpdateTaskInput): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id: input.id },
      data: input,
    });

    return toDomainTask(task);
  }

  async delete(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: { id },
    });

    return toDomainTask(task);
  }

  async filter(filter: TaskFilterParams):  Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { ...filter },
    });

    return tasks ? tasks.map((task: Task) => toDomainTask(task)) : [];
  }
}
