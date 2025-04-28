import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: [
          '**/prisma/dev.db',
        ],
      },
    },
  },
  integrations: [svelte({ extensions: ['.svelte'] })],
  redirects: {
    "/": "/task/list",
  },
  prefetch: {
    prefetchAll: true
  }
});