import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.ttf'],
  server: {
    proxy: {
      '/tmdb-images': {
        target: 'https://image.tmdb.org/t/p/w500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tmdb-images/, ''),
      },
    },
  },
})
