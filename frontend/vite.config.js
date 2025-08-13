import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carga variables del .env (prefijo VITE_)
  const env = loadEnv(mode, process.cwd(), '')
  // Proxy del /api en desarrollo (puedes cambiarlo con VITE_PROXY_TARGET)
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8089'

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true
        }
      }
    }
  }
})
