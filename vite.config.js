import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: mode === 'production' ? '/malan-alerter/' : '/', 
  server:{
    proxy: {
      '/api/items': {
        target: 'https://mapleland.gg',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/items/, '/api/items')
      },
      '/api': {
        target: 'http://192.168.45.201:38081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}))