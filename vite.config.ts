import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  base: '',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.vue', 'ts', 'tsx']
  },
  plugins: [
    vue()
  ],
  define: {
    'process.env': { ...process.env }
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  assetsInclude: ['public', 'src/assets'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia'],
          ui: ['@opentiny/vue'],
          graphic: ['konva', 'vue-advanced-cropper'],
        }
      }
    }
  }
})
