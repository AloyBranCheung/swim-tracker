import { test, expect } from '@/tests/e2e/fixtures/auth.fixture'
import resetDb from './utils/resetdb'

test.describe("test auth flow", () => {
    test.afterEach(async () => {
        await resetDb()
    })

    test("should login", async ({ page, loginPage, userCredentials }) => {
        await loginPage.gotoLogin()
        await loginPage.login(userCredentials.email, userCredentials.password)
        await page.waitForURL(loginPage.url)

        await expect(page.getByRole('link', { name: 'profile-icon Me' })).toBeDefined()
        await expect(page.getByText('Say something witty to get')).toBeDefined()
        await expect(page.getByRole('link', { name: 'profile.svg Home' })).toBeDefined()
        await expect(page.getByRole('link', { name: 'journey-icon Journey' })).toBeDefined()
        await expect(page.getByRole('link', { name: 'social-icon Circle' })).toBeDefined()
        await expect(page.getByRole('link', { name: 'plan-icon Swim Plans' })).toBeDefined()
    })

    test("should logout", async ({ page, loginPage, userCredentials }) => {
        await loginPage.gotoLogin()
        await loginPage.login(userCredentials.email, userCredentials.password)
        await page.waitForURL(loginPage.url)

        await page.getByRole('link', { name: 'profile-icon Me' }).click();
        await page.waitForURL(`${loginPage.url}/profile`)

        await page.getByRole('button', { name: 'Signout' }).click();
        await page.waitForURL(loginPage.url)

        await expect(page.getByText('Login')).toBeDefined()
        await expect(page.getByRole('heading', { name: 'Access Denied' }).nth(4)).toBeDefined()
    })

    test("should show error message for wrong email and for wrong password", async ({ page, loginPage }) => {
        await loginPage.gotoLogin()
        await loginPage.login('wrongmeail@wrongmeail.com', 'wrong password', false)
        await expect(page.getByText('Wrong email or password')).toBeDefined()
    })
})


