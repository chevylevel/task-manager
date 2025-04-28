import { vi } from 'vitest';

export const defineAction = vi.fn((opts) => {
  return async (input: any) => opts.handler(input);
});
