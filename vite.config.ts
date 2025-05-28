import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Split Google API dependencies into smaller chunks
const googleApiDependencies = [
  '@googleapis/docs',
  '@googleapis/drive',
  '@googleapis/forms',
  '@googleapis/sheets',
  '@googleapis/calendar'
];

const googleAuthDependencies = [
  'google-auth-library',
  'google-auth-library-nodejs',
  'gcp-metadata',
  'google-p12-pem',
  'gtoken'
];

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
      ...googleApiDependencies,
      ...googleAuthDependencies
    ],
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
      external: [
        'googleapis-common',
        ...googleApiDependencies,
        ...googleAuthDependencies
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          google: googleApiDependencies
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
    'require': 'globalThis.require',
    'process.version': '"v16.0.0"',
    'process.versions': {
      node: '16.0.0'
    },
    'process.platform': '"browser"',
    'process.env.READABLE_STREAM': '"disable"'
  }
});