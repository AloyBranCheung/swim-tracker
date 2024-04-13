import { test, expect } from '@playwright/test';

test.describe("test journey flow from login to completing one swim", () => {
  test("login to completing one swim", async ({ page, }) => {
    await page.goto('http://localhost:3000/')

    const login = await page.getByText("Login")
    await login.click()

    const emailInput = await page.getByLabel('Email address')
    await emailInput.click()
    await emailInput.fill(process.env.TEST_USER || '')
    await page.getByRole('button', { name: 'Continue' }).click();

    const passwordInput = await page.getByLabel('Password')
    await passwordInput.click()
    await passwordInput.fill(process.env.TEST_PASS || '')

    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('link', { name: 'journey-icon Journey' }).click();
    await page.getByRole('button', { name: 'Let\'s go' }).click();
    await page.getByRole('heading', { name: 'BEGINNER' }).click();
    await page.getByRole('button', { name: 'Start Journey' }).click();
    // TODO: opening modal not working 
    await page.locator('div').filter({ hasText: /^Week 1$/ }).nth(1).click();
    await page.getByRole('button', { name: 'I have done this today!' }).click();

    expect(page.getByText("Today's goal completed :)")).toBeDefined()
    expect(page.getByText("✔️")).toBeDefined()
    expect(page.getByText("2")).toBeDefined()
    expect(page.getByText("Warmup")).toBeDefined()
    expect(page.getByText("Total: 525m")).toBeDefined()
  })
})

