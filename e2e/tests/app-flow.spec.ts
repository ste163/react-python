// e2e/tests/app-flow.spec.ts
import { test, expect } from '@playwright/test';
import { E2E_BASE_URL } from '../config';

test('task creation flow', async ({ page }) => {
  await page.goto(E2E_BASE_URL);

  // Try to submit empty form
  await page.click('button[type="submit"]');
  await expect(page.locator('ul li')).toHaveCount(0);

  // Fill only title, submit
  await page.fill('input[name="title"]', 'Test Task');
  await page.click('button[type="submit"]');
  await expect(page.locator('ul li')).toHaveCount(0);

  // Fill title and description, submit
  await page.fill('input[name="title"]', 'Test Task');
  await page.fill('textarea[name="description"]', 'Test Description');
  await page.click('button[type="submit"]');

  // Task should appear in the list
  await expect(page.locator('ul li')).toHaveCount(1);
  await expect(page.locator('ul li strong')).toHaveText('Test Task');
  await expect(page.locator('ul li p')).toHaveText('Test Description');

  // Form should be cleared
  await expect(page.locator('input[name="title"]')).toHaveValue('');
  await expect(page.locator('textarea[name="description"]')).toHaveValue('');
});
