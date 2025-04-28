import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
  plugins: [
    svelte(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts',
    include: ['src/**/*.test.{ts,tsx,svelte}'],
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
}));