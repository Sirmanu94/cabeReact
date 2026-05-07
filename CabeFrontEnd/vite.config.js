import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- 1. Aggiungi questa riga

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
})
