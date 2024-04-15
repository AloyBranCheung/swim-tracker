import type { Page } from '@playwright/test'

type BrowserName = 'chromium' | 'firefox' | 'webkit';

export class LoginPage {
    readonly page: Page
    public url = 'http://localhost:3000'
    public browserName: BrowserName | undefined = undefined

    constructor(page: Page, browserName: BrowserName, url?: string) {
        this.page = page
        this.browserName = browserName
        if (url) {
            this.url = url
        }
    }

    async gotoLogin() {
        // https://github.com/alexdeathway/Gecom/issues/49 - tl;dr swallow the error for firefox
        try {
            await this.page.goto(this.url)
            if (this.browserName === 'firefox') {
                await this.page.waitForTimeout(1000)
            } else {
                await this.page.waitForURL(this.url)
            }
        } catch (error) {
            if (error instanceof Error && !error.message.includes('NS_BINDING_ABORTED')) {
                throw error;
            }
        }

        // navigate to auth0 login flow
        const login = await this.page.getByText("Login")
        await login.click()
        if (this.browserName === 'firefox') {
            await this.page.waitForTimeout(3000)
        } else {
            await this.page.waitForURL(url => url !== new URL(this.url))
        }
    }

    async login(user: string, pass: string, isSuccess = true) {
        const emailInput = await this.page.getByLabel('Email address')
        await emailInput.click()
        await emailInput.fill(user)
        await this.page.getByRole('button', { name: 'Continue' }).click();

        const passwordInput = await this.page.getByLabel('Password')
        await passwordInput.click()
        await passwordInput.fill(pass)

        // navigate back to localhost:3000/
        await this.page.getByRole('button', { name: 'Continue' }).click();
        if (isSuccess) {
            await this.page.waitForURL(this.url)
        }
    }
}
