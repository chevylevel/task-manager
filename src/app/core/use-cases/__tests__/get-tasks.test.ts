import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { GetTasks } from '../GetTasks';

describe('GetTasks UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: GetTasks;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new GetTasks(mockRepo);
  });

  it('should return all tasks', async () => {
    const tasks = [
      createSampleTask({ id: 1, title: 'Task 1' }),
      createSampleTask({ id: 2, title: 'Task 2' }),
    ];

    mockRepo.getAll.mockResolvedValue(tasks);

    const result = await useCase.execute();

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('should return an empty array if no tasks exist', async () => {
    mockRepo.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(mockRepo.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
