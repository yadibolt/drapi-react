import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      },
    }),
    tailwindcss(), tsconfigPaths()
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    allowedHosts: [
      "drapireact.loc", "api.drapireact.loc"
    ]
  }
})
