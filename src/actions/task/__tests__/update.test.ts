import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as controller from '../../../app/controllers/task/update.controller';
import { createSampleTaskInput, createSampleTask } from '../../../../__mocks__/factories';
import { updateTaskInputSchema } from '../update/schema';
import { handleUpdateTask } from '../update/handler';

vi.mock('../../../app/controllers/task/update.controller');

describe('updateAction', () => {
  const mockUpdateTask = vi.mocked(controller).updateTask;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates input and calls controller on valid input', async () => {
    // Reuse createSampleTaskInput but make sure it fits update shape (e.g. with id)
    const input = {
      id: 123,
      ...createSampleTaskInput({ title: 'Updated Task' }),
    };
    const fakeTask = createSampleTask({ id: 123, title: 'Updated Task' });

    mockUpdateTask.mockResolvedValue(fakeTask);

    const validatedInput = updateTaskInputSchema.parse(input);
    const result = await handleUpdateTask(validatedInput);

    expect(mockUpdateTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({ success: true, task: fakeTask });
  });

  it('returns error object when controller throws', async () => {
    const input = {
      id: 123,
      ...createSampleTaskInput({ title: 'Error Task' }),
    };
    const errorMessage = "Update failed";

    mockUpdateTask.mockRejectedValue(new Error(errorMessage));

    const validatedInput = updateTaskInputSchema.parse(input);
    const result = await handleUpdateTask(validatedInput);

    expect(mockUpdateTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({
      success: false,
      error: errorMessage,
    });
  });
});
