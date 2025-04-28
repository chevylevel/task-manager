import type { Task as PrismaTask } from "@prisma/client";
import type { Task } from "../../core/entities/Task";

export function toDomainTask(prismaTask: PrismaTask): Task {
  return {
    ...prismaTask,
    priority: prismaTask.priority as Task['priority'],
  };
}