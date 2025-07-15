import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, 
    strictPort: false, // Farklı bir port kullanabilsin
    port: 5173, 
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-arm64-musl'] // Sorun çıkaran bağımlılığı dışla
  },
  build: {
    commonjsOptions: {
      include: [] // Rollup sorununu önlemek için
    }
  }
})
