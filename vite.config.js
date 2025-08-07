import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  root: './', // 👈 asegura que Vite busque desde la raíz
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // 👈 define explícitamente el entry
    },
  },
});
