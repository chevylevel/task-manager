import { beforeEach, describe, expect, it, type Mocked } from 'vitest';
import { createMockTaskRepository, createSampleTask } from '../../../../../__mocks__/factories';
import type { TaskPriority } from '../../entities/Task';
import type { TaskRepository } from '../../interfaces/TaskRepository';
import { FilterTasks } from '../FilterTasks';

describe('FilterTasks UseCase', () => {
  let mockRepo: Mocked<TaskRepository>;
  let useCase: FilterTasks;

  beforeEach(() => {
    mockRepo = createMockTaskRepository();
    useCase = new FilterTasks(mockRepo);
  });

  it('should filter tasks by given criteria', async () => {
    const filter = { priority: 'medium' as TaskPriority, completed: false };
    const filteredTasks = [
      createSampleTask({ id: 1, priority: 'medium', completed: false }),
      createSampleTask({ id: 2, priority: 'medium', completed: false }),
    ];

    mockRepo.filter.mockResolvedValue(filteredTasks);

    const result = await useCase.execute(filter);

    expect(mockRepo.filter).toHaveBeenCalledWith(filter);
    expect(result).toEqual(filteredTasks);
  });

  it('should return empty array if no tasks match', async () => {
    const filter = { priority: 'high' as TaskPriority, completed: true };

    mockRepo.filter.mockResolvedValue([]);

    const result = await useCase.execute(filter);

    expect(mockRepo.filter).toHaveBeenCalledWith(filter);
    expect(result).toEqual([]);
  });
});
