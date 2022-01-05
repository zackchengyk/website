import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'zackchengyk.github.io',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
