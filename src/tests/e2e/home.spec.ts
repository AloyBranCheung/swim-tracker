import { test, expect } from '@/tests/e2e/fixtures/auth.fixture'
import resetDb from './utils/resete2edb'

test.describe("test home page flow from login to recording one swim activity", () => {
    test.afterEach(async () => {
        await resetDb()
    })

    test("login to recording one swim", async ({ page, loginPage, userCredentials }) => {
        // login
        await loginPage.gotoLogin()
        await loginPage.login(userCredentials.email, userCredentials.password)

        // open modal and add swim distance
        await page.getByRole('button', { name: 'Record a swim' }).click()
        await page.getByLabel('Distance Swam (in meters)').fill('500');
        await page.getByRole('button', { name: 'Submit' }).click();

        // navigate to profile page 
        await page.getByRole('link', { name: 'profile-icon Me' }).click();
        await page.waitForURL(`${loginPage.url}/profile`)

        // 
        await expect(page.getByRole('heading', { name: '500 m' })).toBeDefined()
    })

    test("login to recording one swim error", async ({ page, loginPage, userCredentials }) => {
        // login
        await loginPage.gotoLogin()
        await loginPage.login(userCredentials.email, userCredentials.password)

        // open modal and add swim distance
        await page.getByRole('button', { name: 'Record a swim' }).click()
        await page.getByRole('button', { name: 'Submit' }).click();

        // 
        await expect(page.getByText('Error: no swim distance')).toBeDefined()
    })
})