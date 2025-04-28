import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTaskInput, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { CreateTask } from '../CreateTask';

describe('CreateTask UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: CreateTask;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new CreateTask(mockRepo);
  });

  it('should create a task', async () => {
    const input = createSampleTaskInput({ title: 'Learn Vitest' });
    const expectedTask = createSampleTask({ title: 'Learn Vitest' });

    mockRepo.create.mockResolvedValue(expectedTask);

    const result = await useCase.execute(input);

    expect(mockRepo.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(expectedTask);
  });
});
