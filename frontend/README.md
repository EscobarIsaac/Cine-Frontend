# Cine Encuentro — Frontend (Vite + React)

## Requisitos
- Node.js 18+
- Gateway en `http://localhost:8089/api` (o define `VITE_API_BASE_URL`)

## Instalación
```bash
npm install
npm run dev
```

## Rutas
- `/` → Asistencias (CRUD básico contra `/api/asistencias`)
- `/usuarios` → GET `/api/usuarios`
- `/eventos` → GET `/api/eventos`
- `/entradas` → GET `/api/entradas`
- `/notificaciones` → GET `/api/notificaciones`
