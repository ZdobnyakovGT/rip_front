import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: "/shows_front/",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://lockalhost:8000",

            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})