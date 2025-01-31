import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // base: "/metronic8/react/demo2/",
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})
