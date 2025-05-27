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
    exclude: ['lucide-react'],
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.env.GOOGLE_SDK_NODE_LOGGING': JSON.stringify('off'),
    'process.stdout': {},
    'process.stderr': {},
    'process.stdin': {},
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify('v16.0.0'),
    'process.isTTY': false
  }
});