import { test, expect } from '@/tests/e2e/fixtures/auth.fixture'
import resetDb from './utils/resetdb'

test.describe("test flow login to making a post in circle", () => {
    let CIRCLE_PAGE_URL: string;

    test.beforeEach(async ({ loginPage, userCredentials }) => {
        // login
        await loginPage.gotoLogin()
        await loginPage.login(userCredentials.email, userCredentials.password)

        CIRCLE_PAGE_URL = `${loginPage.url}/circle`
    })

    test.afterEach(async () => {
        await resetDb()
    })

    test("login to circle to post", async ({ page, browserName }) => {
        // home page submit status update
        await page.getByText('Say something witty...').click();
        await page.getByPlaceholder('Say something witty...').fill('say something witty');

        const submitButton = await page.getByRole('button', { name: 'Submit' })
        await submitButton.click();

        // latest posts
        await expect(page.getByText('test@test.com')).toBeDefined()
        await expect(page.getByText('say something witty', { exact: true })).toBeDefined()

        // navigate to /circle
        const seeMoreBtn = await page.getByRole('link', { name: 'See more' })
        await expect(seeMoreBtn).toBeDefined()
        await seeMoreBtn.click()
        if (browserName === 'firefox') {
            // firefox works in debug/normal user navigation but not in automated testing...
            await page.waitForTimeout(1000)
        } else {
            await page.waitForURL(CIRCLE_PAGE_URL, { timeout: 30000 })
        }

        // expect same post as latest posts
        await expect(page.getByText('test@test.com')).toBeDefined()
        await expect(page.getByText('say something witty', { exact: true })).toBeDefined()
        await expect(page.getByText("That's all folks")).toBeDefined()
    })
    test("login to main page to post to circle", async ({ page, loginPage }) => {
        await page.getByRole('link', { name: 'social-icon Circle' }).click();
        await page.waitForURL(CIRCLE_PAGE_URL, { timeout: 30000 })

        await page.getByText('Say something witty...').click();
        await page.getByPlaceholder('Say something witty...').fill('say something witty');
        await page.getByRole('button', { name: 'Submit' }).click();

        await expect(page.getByText('say something witty', { exact: true })).toBeDefined()
        await expect(page.getByText('test@test.com')).toBeDefined()
        await page.getByRole('button', { name: 'Load More' }).click();
        await expect(page.getByText("That's all folks")).toBeDefined()

        await page.getByRole('link', { name: 'profile.svg Home' }).click();
        await page.waitForURL(loginPage.url)

        await expect(page.getByText('test@test.com')).toBeDefined()
        await expect(page.getByText('say something witty', { exact: true })).toBeDefined()
        await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeDefined()
    })
})