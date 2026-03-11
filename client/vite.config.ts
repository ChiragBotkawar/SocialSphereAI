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
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            // Backend not running — return a clean 503 so React Query
            // handles it gracefully instead of crashing the Vite process.
            console.warn('[proxy] Backend unreachable –', err.message);
            const r = res as import('node:http').ServerResponse;
            if (r && !r.headersSent) {
              r.writeHead(503, { 'Content-Type': 'application/json' });
              r.end(JSON.stringify({ success: false, data: [], message: 'Backend unavailable' }));
            }
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          swiper: ['swiper'],
        },
      },
    },
  },
});
