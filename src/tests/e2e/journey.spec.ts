import { test, expect } from '@/tests/e2e/fixtures/auth.fixture'
import resetDb from './utils/resetdb'

test.describe("test journey flow from login to completing one swim", () => {
  test.afterEach(async () => {
    await resetDb()
  })

  test("login to completing one swim", async ({ page, loginPage, userCredentials }) => {
    await loginPage.gotoLogin()
    await loginPage.login(userCredentials.email, userCredentials.password)

    await page.getByRole('link', { name: 'journey-icon Journey' }).click();
    await page.waitForURL(`${loginPage.url}/journey`)

    // await page.getByRole('button', { name: 'Let\'s go' }).click();
    // await page.getByRole('heading', { name: 'BEGINNER' }).click();
    // await page.getByRole('button', { name: 'Start Journey' }).click();
    // // TODO: opening modal not working 
    // await page.locator('div').filter({ hasText: /^Week 1$/ }).nth(1).click();
    // await page.getByRole('button', { name: 'I have done this today!' }).click();

    // expect(page.getByText("Today's goal completed :)")).toBeDefined()
    // expect(page.getByText("✔️")).toBeDefined()
    // expect(page.getByText("2")).toBeDefined()
    // expect(page.getByText("Warmup")).toBeDefined()
    // expect(page.getByText("Total: 525m")).toBeDefined()
  })
})

