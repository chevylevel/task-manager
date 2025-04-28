import * as controller from '../../../app/controllers/task/delete.controller';
import { createSampleTask } from '../../../../__mocks__/factories';
import { deleteTaskInputSchema } from '../delete/schema';
import { handleDeleteTask } from '../delete/handler';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../app/controllers/task/delete.controller');

describe('handleDeleteTask', () => {
  const mockDeleteTask = vi.mocked(controller).deleteTask;
  

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls deleteTask controller and returns success with deleted task', async () => {
    const input = { id: 1 };
    const fakeTask = createSampleTask({ id: 1 });

    mockDeleteTask.mockResolvedValue(fakeTask);

    const validatedInput = deleteTaskInputSchema.parse(input);
    const result = await handleDeleteTask(validatedInput);

    expect(mockDeleteTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({ success: true, task: fakeTask });
  });

  it('returns error object if controller throws', async () => {
    const input = { id: 1 };
    const errorMessage = 'Task not found';

    mockDeleteTask.mockRejectedValue(new Error(errorMessage));

    const validatedInput = deleteTaskInputSchema.parse(input);
    const result = await handleDeleteTask(validatedInput);

    expect(mockDeleteTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({ success: false, error: errorMessage });
  });
});
