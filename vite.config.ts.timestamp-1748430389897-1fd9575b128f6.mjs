// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { nodePolyfills } from "file:///home/project/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
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
    exclude: ["lucide-react"],
    include: [],
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      sourcemap: false,
      target: "es2020"
    }
  },
  build: {
    sourcemap: false,
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"]
        }
      }
    }
  },
  define: {
    global: "globalThis",
    "process.env": {},
    "process.stdout": {},
    "process.stderr": {},
    "process.stdin": {},
    "exports": {},
    "module.exports": {},
    "require": "globalThis.require"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgQnVmZmVyOiB0cnVlLFxuICAgICAgICBnbG9iYWw6IHRydWUsXG4gICAgICAgIHByb2Nlc3M6IHRydWVcbiAgICAgIH0sXG4gICAgICBwcm90b2NvbEltcG9ydHM6IHRydWVcbiAgICB9KVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgIGluY2x1ZGU6IFtdLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBkZWZpbmU6IHtcbiAgICAgICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcydcbiAgICAgIH0sXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgdGFyZ2V0OiAnZXMyMDIwJ1xuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6ICdnbG9iYWxUaGlzJyxcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgICAncHJvY2Vzcy5zdGRvdXQnOiB7fSxcbiAgICAncHJvY2Vzcy5zdGRlcnInOiB7fSxcbiAgICAncHJvY2Vzcy5zdGRpbic6IHt9LFxuICAgICdleHBvcnRzJzoge30sXG4gICAgJ21vZHVsZS5leHBvcnRzJzoge30sXG4gICAgJ3JlcXVpcmUnOiAnZ2xvYmFsVGhpcy5yZXF1aXJlJ1xuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLHFCQUFxQjtBQUU5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsSUFDeEIsU0FBUyxDQUFDO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxRQUMvQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsZUFBZSxDQUFDO0FBQUEsSUFDaEIsa0JBQWtCLENBQUM7QUFBQSxJQUNuQixrQkFBa0IsQ0FBQztBQUFBLElBQ25CLGlCQUFpQixDQUFDO0FBQUEsSUFDbEIsV0FBVyxDQUFDO0FBQUEsSUFDWixrQkFBa0IsQ0FBQztBQUFBLElBQ25CLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
