import { defineConfig } from 'vite'

// Custom domain deployment (see public/CNAME) — served from the domain root.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
})
