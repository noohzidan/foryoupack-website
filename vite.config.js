import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      '.noohzidan.blog',   // any subdomain (forupack, foryou, …)
      '169.58.139.92',     // raw VPS IP (self-signed HTTPS)
      'localhost',
      '127.0.0.1',
    ],
  },
})
