import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',  // Fixes routing issues on Vercel
  build: {
    outDir: 'dist',  // Ensure Vite outputs to "dist"
    emptyOutDir: true,  // Clean old files before building
  },
  server: {
    host: true,  // Allows external access (useful in dev mode)
    port: 3000,  // Default port for Vite
  }
});
