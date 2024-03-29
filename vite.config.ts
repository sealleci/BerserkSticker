import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import importPlugin from '@opentiny/vue-vite-import'

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
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
  },
  plugins: [
    vue(),
    importPlugin(
      [
        {
          libraryName: '@opentiny/vue'
        },
        {
          libraryName: `@opentiny/vue-icon`,
          customName: (name) => {
            return `@opentiny/vue-icon/lib/${name.replace(/^icon-/, '')}.js`
          }
        }
      ],
      'pc'
    )
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
          ui: ['@opentiny/vue-button', '@opentiny/vue-modal', '@opentiny/vue-collapse', '@opentiny/vue-collapse-item'],
          graphic: ['konva', 'vue-advanced-cropper']
        }
      }
    }
  }
})
