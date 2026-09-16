import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import osmanliPrerenderPlugin from './vite-plugin-prerender.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), osmanliPrerenderPlugin()],
  // GitHub Pages'te https://<kullanıcı>.github.io/Oyunlar/ altında yayınlanıyor.
  base: '/Oyunlar/',
})
