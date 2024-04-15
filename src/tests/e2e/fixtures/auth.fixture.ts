import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'


interface UserDetails {
    email: string;
    password: string;
}

interface AuthFixtures {
    loginPage: LoginPage
    userCredentials: UserDetails
}

export const test = base.extend<AuthFixtures>({
    loginPage: async ({ page, browserName }, use) => {
        const loginPage = new LoginPage(page, browserName)
        await loginPage.gotoLogin()
        await use(loginPage)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userCredentials: async ({ page }, use) => {
        const email = process.env.TEST_USER || 'missing'
        const password = process.env.TEST_PASS || 'missing'

        expect(email).not.toBe('missing')
        expect(password).not.toBe('missing')

        await use({ email, password })
    }
})

export { expect } from '@playwright/test'