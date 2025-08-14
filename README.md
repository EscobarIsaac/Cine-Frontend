# Cine-Frontend

# Cine Encuentro — Frontend (React + Vite)

## 🧩 Stack
- React 18, Vite 5
- React Router, Axios
- `.env` controla la URL del backend (`VITE_API_BASE_URL`)

Pantallas: **Asistencias, Usuarios, Eventos, Entradas, Notificaciones**  
Cada una lista e **inserta** datos (y Asistencias permite **actualizar puerta**).

---

## 🚀 Local (desarrollo)

1) Instalar dependencias
```bash
cd frontend
npm install
```

2) Variables para dev (`frontend/.env`)
```env
VITE_API_BASE_URL=/api
VITE_PROXY_TARGET=http://localhost:8089
```

3) `vite.config.js` (proxy al gateway local)
```js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8089'
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': { target: proxyTarget, changeOrigin: true }
      }
    }
  }
})
```

4) Correr
```bash
npm run dev
# abre http://localhost:5173
```

> Asegúrate de tener el **gateway** local en `http://localhost:8089`.

---

## 🏗️ Build y preview local

```bash
npm run build
npm run preview   # http://localhost:4173
```

---

## ☁️ Deploy en Vercel (recomendado)

1) Sube este directorio `frontend/` a GitHub.
2) En **vercel.com/new**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3) **Environment Variables (Production)**:
   - `VITE_API_BASE_URL = https://TU-DOMINIO/api`
     - `TU-DOMINIO` es el **túnel público** a tu gateway (ngrok o Cloudflare).
4) Deploy → obtienes una URL pública `https://tu-app.vercel.app`.

> SPA: si al refrescar una ruta ves 404, añade `vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

---

## 🌐 Cómo obtener el dominio público del backend

### A) ngrok
```powershell
winget upgrade Ngrok.Ngrok --accept-package-agreements --accept-source-agreements
ngrok config add-authtoken TU_TOKEN
ngrok http 8089
# copia: https://xxxxx.ngrok-free.app
```

### B) Cloudflare Tunnel (alternativa sin cuenta)
```powershell
winget install Cloudflare.cloudflared --accept-package-agreements --accept-source-agreements
cloudflared tunnel --url http://localhost:8089
# copia: https://xxxxx.trycloudflare.com
```

Pega `https://xxxxx.../api` en `VITE_API_BASE_URL` (Vercel → Settings → Environment Variables) y **Redeploy**.

> **Importante**: deja **abierto** el túnel mientras usen el front.  
> Si cambia la URL, actualiza la variable en Vercel y vuelve a **Redeploy**.

---

## 🧪 Pruebas rápidas (desde el navegador)

- Ver lista de **Asistencias** → pestaña *Asistencias*
- Crear **Usuario** / **Evento** / **Entrada** → pestañas respectivas
- Cambiar “**puerta**” de una Asistencia (form de la derecha en Asistencias)

Si la tabla no carga:
- Revisa que `VITE_API_BASE_URL` apunte al dominio correcto (puede verse en la UI del front).
- El gateway debe responder `/actuator/health` y el micro correspondiente debe estar **UP**.

---

## 🛠️ Troubleshooting

- **CORS**: asegúrate que el **gateway** tenga `allowedOriginPatterns` con:
  - `https://*.vercel.app`
  - `https://*.ngrok-free.app` o `https://*.trycloudflare.com`
- **503 Service Unavailable**: el micro no está corriendo o el puerto no coincide con la ruta del gateway.
- **Vercel “Permission denied: vite”**: subiste `node_modules` al repo. Asegura `.gitignore` con `node_modules` y `dist`, commitea y reintenta.
- **Vercel “npm ci … lockfile mismatch”**: sincroniza `package.json` y `package-lock.json` (`rm package-lock.json && npm install`), commitea y redeploy.

---

## 📄 Scripts de npm

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173"
  }
}
```
