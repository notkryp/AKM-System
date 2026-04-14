// @ts-check
import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const TEST_EMAIL = process.env.E2E_EMAIL || 'e2e-test@akmbooks.dev'
const TEST_PASS  = process.env.E2E_PASS  || 'Test1234!'

test.describe('Reserve & Cancel flow', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto(`${BASE}/login`)
    await page.fill('input[type="email"]', TEST_EMAIL)
    await page.fill('input[type="password"]', TEST_PASS)
    await page.click('button[type="submit"]')
    await page.waitForURL(`${BASE}/`)
  })

  test('user can reserve an available book', async ({ page }) => {
    // Click first available book
    await page.goto(`${BASE}/`)
    const firstBook = page.locator('[data-testid="book-card"]').first()
    await firstBook.click()

    // Should land on detail page
    await expect(page).toHaveURL(/\/books\/\d+/)

    // Click Reserve button
    await page.click('[data-testid="reserve-btn"]')
    await expect(page).toHaveURL(/\/books\/\d+\/reserve/)

    // Fill reservation form
    await page.fill('[name="name"]', 'E2E Test User')
    const today = new Date().toISOString().split('T')[0]
    await page.fill('[name="pickupDate"]', today)
    await page.click('button[type="submit"]')

    // Should redirect to My Reservations with toast
    await page.waitForURL(`${BASE}/my-reservations`)
    await expect(page.locator('[data-testid="toast"]')).toBeVisible()
  })

  test('user can cancel an active reservation', async ({ page }) => {
    await page.goto(`${BASE}/my-reservations`)

    // Find first active reservation and cancel it
    const cancelBtn = page.locator('[data-testid="cancel-btn"]').first()
    await cancelBtn.click()

    // Confirm dialog
    page.on('dialog', d => d.accept())

    // Toast should appear
    await expect(page.locator('[data-testid="toast"]')).toBeVisible()

    // The reservation card should disappear
    await expect(cancelBtn).not.toBeVisible()
  })
})
