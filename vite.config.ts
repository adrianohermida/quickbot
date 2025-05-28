import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
    exclude: [
      'lucide-react',
      'google-logging-utils',
      'googleapis-common',
      'google-auth-library',
      'google-auth-library-nodejs',
      'gcp-metadata',
      'google-p12-pem',
      'gtoken'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      external: [
        'googleapis-common',
        'google-auth-library',
        'google-auth-library-nodejs',
        'gcp-metadata',
        'google-p12-pem',
        'gtoken'
      ],
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.stdout': {},
    'process.stderr': {},
    'process.stdin': {},
    'exports': {},
    'module.exports': {},
    'require': 'globalThis.require',
    'process.version': '"v16.0.0"',
    'process.versions': {
      node: '16.0.0'
    },
    'process.platform': '"browser"',
    'process.env.READABLE_STREAM': '"disable"'
  }
});