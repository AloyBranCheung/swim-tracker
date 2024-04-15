import type { Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async gotoLogin() {
        await this.page.goto('http://localhost:3000/')
        await this.page.waitForURL('http://localhost:3000/')
        const login = await this.page.getByText("Login")
        await login.click()
    }

    async login(user: string, pass: string) {
        const emailInput = await this.page.getByLabel('Email address')
        await emailInput.click()
        await emailInput.fill(user)
        await this.page.getByRole('button', { name: 'Continue' }).click();

        const passwordInput = await this.page.getByLabel('Password')
        await passwordInput.click()
        await passwordInput.fill(pass)

        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}
