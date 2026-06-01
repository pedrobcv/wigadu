# Wigadu

Wigadu es una plataforma educativa/gamificada para crear experiencias de aprendizaje interactivas en minutos.

## Stack
- React
- Vite
- React Router
- Firebase-ready (Auth, Firestore, Storage)

## Rutas principales
- `/` Landing comercial
- `/login` Acceso
- `/games` Catálogo de juegos
- `/games/:slug` Vista de juego
- `/dashboard` Panel base
- `/admin` Administración

## Desarrollo local
```bash
npm install
npm run dev
```

## Producción
```bash
npm run build
npm run preview
```

## Firebase
Copia `.env.example` a `.env` y completa estas variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Cuando esas variables estén definidas, la app detectará Firebase automáticamente.
