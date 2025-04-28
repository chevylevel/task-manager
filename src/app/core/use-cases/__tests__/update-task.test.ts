import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { UpdateTask } from '../UpdateTask';
import type { UpdateTaskInput } from '../UpdateTask';

describe('UpdateTask UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: UpdateTask;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new UpdateTask(mockRepo);
  });

  it('should update a task and return the updated task', async () => {
    const input: UpdateTaskInput = {
      id: 1,
      title: 'Updated Task Title',
      completed: true,
    };

    const updatedTask = createSampleTask({
      id: 1,
      title: 'Updated Task Title',
      completed: true,
    });

    mockRepo.update.mockResolvedValue(updatedTask);

    const result = await useCase.execute(input);

    expect(mockRepo.update).toHaveBeenCalledWith(input);
    expect(result).toEqual(updatedTask);
  });

  it('should throw if the repository throws', async () => {
    const input: UpdateTaskInput = { id: 2, title: 'Fail Update' };
    const errorMessage = 'Update failed';

    mockRepo.update.mockRejectedValue(new Error(errorMessage));

    await expect(useCase.execute(input)).rejects.toThrow(errorMessage);
    expect(mockRepo.update).toHaveBeenCalledWith(input);
  });
});
