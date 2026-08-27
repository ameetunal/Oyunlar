import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages'te https://ameetunal.github.io/osmanli-quiz/ altında yayınlanıyor
// (ameetunal.github.io reposunun deploy iş akışı tarafından ana site build'inin
// yanına, dist/osmanli-quiz/ olarak eklenir).
export default defineConfig({
  plugins: [react()],
  base: '/osmanli-quiz/',
})
