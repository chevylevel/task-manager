import type { TaskRepository } from '../src/app/core/interfaces/TaskRepository';
import type { CreateTaskInput } from '../src/app/core/use-cases/CreateTask';
import type { Task } from '../src/app/core/entities/Task';
import { vi, type Mocked } from 'vitest';

export function createMockTaskRepository(): Mocked<TaskRepository> {
  return {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn(),
    filter: vi.fn(),
  };
}

export function createSampleTaskInput(overrides?: Partial<CreateTaskInput>): CreateTaskInput {
  return {
    title: 'Sample Task',
    description: 'This is a sample task description.',
    dueDate: new Date(),
    priority: 'medium',
    ...overrides,
  };
}

export function createSampleTask(overrides?: Partial<Task>): Task {
  return {
    id: 1,
    title: 'Sample Task',
    description: 'This is a sample task description.',
    dueDate: new Date(),
    priority: 'medium',
    completed: false,
    ...overrides,
  };
}
