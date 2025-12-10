import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: '/water-twin-screen/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src')
      }
    ],
    dedupe: ['vue']
  },
  plugins: [
    react(),
  ],
  server: {
    port: 9002,
  }
})
