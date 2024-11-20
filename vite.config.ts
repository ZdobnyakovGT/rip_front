import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: "/",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://192.168.50.172:8000",
                changeOrigin: true,
                secure: false,
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})
