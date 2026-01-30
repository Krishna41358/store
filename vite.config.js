import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API calls to Worker dev server (wrangler dev runs on 8787 by default)
    proxy: {
      '/api': 'http://127.0.0.1:8787',
    },
  },
})
