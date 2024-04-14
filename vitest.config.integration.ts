// vitest.config.integration.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        maxConcurrency: 0,
        setupFiles: ['src/tests/setups/setup.ts'],
        include: ['src/tests/integration/**/*.test.ts', 'src/tests/integration/**/*.test.tsx']

    },
    resolve: {
        alias: {
            auth: '/src/auth',
            quotes: '/src/quotes',
            lib: '/src/lib'
        }
    }
})