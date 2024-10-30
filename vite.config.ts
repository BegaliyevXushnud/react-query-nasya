import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {find: "@", replacement:"/src/"},
      {find: "@component", replacement:"/src/component"},
      {find: "@modules", replacement:"/src/modules"},
      {find: "@api", replacement:"/src/api"},
    ]
  }
})
