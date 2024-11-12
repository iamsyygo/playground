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
      // 预热常用文件提前编译，不需要浏览器主动请求才能被 vite 编译
      clientFiles: ['./src/main.ts']
    }
  },
  define: {
    // 关闭 options api 减少打包体积
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
