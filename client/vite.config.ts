import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: ['fbe170ee-fa2a-4d5f-bb70-4209a603af12-00-30m7rfzobk2s4.riker.replit.dev'],
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: ['fbe170ee-fa2a-4d5f-bb70-4209a603af12-00-30m7rfzobk2s4.riker.replit.dev'],
  },
});
