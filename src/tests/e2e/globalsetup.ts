import dotenv from 'dotenv';
import { FullConfig } from '@playwright/test'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSetup = async (config: FullConfig) => {
    dotenv.config({
        path: './.env.test',
        override: true,
    })
}

export default globalSetup