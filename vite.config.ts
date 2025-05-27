import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      protocolImports: true
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react', 'google-logging-utils', 'googleapis-common'],
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.stdout': {},
    'process.stderr': {},
    'process.stdin': {},
  }
});