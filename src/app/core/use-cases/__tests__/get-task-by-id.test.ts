import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { GetTaskById } from '../GetTaskById';

describe('GetTaskById UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: GetTaskById;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new GetTaskById(mockRepo);
  });

  it('should return the task for the given id', async () => {
    const taskId = 123;
    const expectedTask = createSampleTask({ id: taskId });

    mockRepo.getById.mockResolvedValue(expectedTask);

    const result = await useCase.execute({ id: taskId });

    expect(mockRepo.getById).toHaveBeenCalledWith(taskId);
    expect(result).toEqual(expectedTask);
  });

  it('should return null if no task found', async () => {
    const taskId = 999;

    mockRepo.getById.mockResolvedValue(null);

    const result = await useCase.execute({ id: taskId });

    expect(mockRepo.getById).toHaveBeenCalledWith(taskId);
    expect(result).toBeNull();
  });
});
