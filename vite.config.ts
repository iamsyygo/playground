import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    // https://vite.dev/guide/performance.html#warm-up-frequently-used-files
    warmup: {
      clientFiles: ['./src/main.ts']
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
  },
  plugins: [vue(), unocss()],
  css: {
    postcss: {
      plugins: []
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
