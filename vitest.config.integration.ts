// vitest.config.integration.ts
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

export default defineConfig({
    test: {
        maxConcurrency: 0,
        setupFiles: ['src/tests/setups/setup.ts'],
        include: ['src/tests/integration/**/*.test.ts', 'src/tests/integration/**/*.test.tsx']

    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
})