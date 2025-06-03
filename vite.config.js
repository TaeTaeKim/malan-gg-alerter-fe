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
  // Vite가 빌드할 때 사용하는 기본 경로 설정
  base: mode === 'production' ? '/malan-alerter/' : '/',
  define:{
    __API_PREFIX__: JSON.stringify(mode === 'production' ? '/malan-alerter' : '')
  },
  server:{
    proxy: {
      '/malangg': {
        target: 'https://mapleland.gg',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/malangg/, '')
      },
      '/api': {
        target: mode === 'production'? 'http://192.168.45.201:38081': 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}))