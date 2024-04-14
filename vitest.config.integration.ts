// vitest.config.integration.ts
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

export default defineConfig({
    test: {
        setupFiles: ['src/tests/setups/setup.ts'],
        include: ['src/tests/integration/**/*.test.ts', 'src/tests/integration/**/*.test.tsx'],
        poolOptions: {
            threads: {
                singleThread: true
            }
        }
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
})