import * as controller from '../../../app/controllers/task/create.controller';
import { createSampleTaskInput, createSampleTask } from '../../../../__mocks__/factories';
import { createTaskInputSchema } from '../create/schema';
import { handleCreateTask } from '../create/handler';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../app/controllers/task/create.controller');

describe('createAction', () => {
  const mockCreateTask = vi.mocked(controller).createTask;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates input and calls controller on valid input', async () => {
    const input = createSampleTaskInput({ title: 'Mock Task' });
    const fakeTask = createSampleTask({ title: 'Mock Task' });

    mockCreateTask.mockResolvedValue(fakeTask);

    const validatedInput = createTaskInputSchema.parse(input);
    const result = await handleCreateTask(validatedInput);

    expect(mockCreateTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({ success: true, task: fakeTask });
  });

  it('returns error object when controller throws', async () => {
    const input = createSampleTaskInput({ title: 'Error Task' });
    const errorMessage = "Something went wrong";

    mockCreateTask.mockRejectedValue(new Error(errorMessage));

    const validatedInput = createTaskInputSchema.parse(input);
    const result = await handleCreateTask(validatedInput);

    expect(mockCreateTask).toHaveBeenCalledWith(validatedInput);
    expect(result).toEqual({
      success: false,
      error: errorMessage,
    });
  });
});
