import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { DeleteTask } from '../DeleteTask';

describe('DeleteTask UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: DeleteTask;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new DeleteTask(mockRepo);
  });

  it('should delete a task by id', async () => {
    const taskId = 42;
    const deletedTask = createSampleTask({ id: taskId });

    mockRepo.delete.mockResolvedValue(deletedTask);

    const result = await useCase.execute({ id: taskId });

    expect(mockRepo.delete).toHaveBeenCalledWith(taskId);
    expect(result).toEqual(deletedTask);
  });
});
