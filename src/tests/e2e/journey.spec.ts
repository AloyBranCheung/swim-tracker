import { test, expect } from '@/tests/e2e/fixtures/auth.fixture'
import resetDb from './utils/resete2edb'

test.describe("test journey flow from login to completing one swim", () => {
  test.afterEach(async () => {
    await resetDb()
  })

  test("login to completing one swim", async ({ page, loginPage, userCredentials }) => {
    await loginPage.gotoLogin()
    await loginPage.login(userCredentials.email, userCredentials.password)

    const JOURNEY_PAGE_URL = `${loginPage.url}/journey`
    const PLANS_PAGE_URL = `${loginPage.url}/plans`

    await page.getByRole('link', { name: 'journey-icon Journey' }).click();
    await page.waitForURL(JOURNEY_PAGE_URL)

    await page.getByRole('button', { name: 'Let\'s go' }).click();
    await page.waitForURL(PLANS_PAGE_URL)

    await page.getByRole('heading', { name: 'BEGINNER' }).click();
    await page.getByRole('button', { name: 'Start Journey' }).click();
    await page.waitForURL(JOURNEY_PAGE_URL)

    // TODO: opening modal not working 
    await page.locator('div').filter({ hasText: /^Week 1$/ }).nth(1).click();
    await page.getByRole('button', { name: 'I have done this today!' }).click();

    await page.reload()

    await page.locator('div').filter({ hasText: /^Week 1$/ }).nth(1).click();

    await expect(page.getByText("Today's goal completed :)")).toBeDefined()
    await expect(page.getByText("✔️")).toBeDefined()
    await expect(page.getByText("2")).toBeDefined()
    await expect(page.getByText("Warmup")).toBeDefined()
    await expect(page.getByText("Total: 525m")).toBeDefined()
  })
})

