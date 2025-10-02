import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // 👈 increase limit (optional)
    rollupOptions: {
      output: {
        manualChunks: {
          // split big libraries into separate files
          leaflet: ['leaflet', 'react-leaflet'],
          mui: ['@mui/material', '@mui/icons-material'],
          react: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
