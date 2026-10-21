import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generates physical SPA fallback pages so refreshing on /admin never throws 404 on Vercel
function spaFallbackPlugin() {
  return {
    name: 'spa-fallback-plugin',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist')
        const indexPath = path.resolve(distDir, 'index.html')
        if (fs.existsSync(indexPath)) {
          const indexHtml = fs.readFileSync(indexPath, 'utf-8')

          // 1. Create dist/admin/index.html
          const adminDir = path.resolve(distDir, 'admin')
          if (!fs.existsSync(adminDir)) {
            fs.mkdirSync(adminDir, { recursive: true })
          }
          fs.writeFileSync(path.resolve(adminDir, 'index.html'), indexHtml, 'utf-8')

          // 2. Create dist/admin.html
          fs.writeFileSync(path.resolve(distDir, 'admin.html'), indexHtml, 'utf-8')

          // 3. Create dist/404.html for Vercel SPA routing
          fs.writeFileSync(path.resolve(distDir, '404.html'), indexHtml, 'utf-8')

          console.log('⚡ [BUILD] Generated dist/admin/index.html, dist/admin.html, and dist/404.html for direct reload support')
        }
      } catch (err) {
        console.warn('SPA fallback generator notice:', err.message)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            return 'vendor-utils'
          }
        }
      }
    }
  }
})
