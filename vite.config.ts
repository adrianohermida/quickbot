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
    exclude: ['lucide-react'],
    include: [],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      sourcemap: false,
      target: 'es2020'
    }
  },
  build: {
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
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
    'require': 'globalThis.require'
  }
});