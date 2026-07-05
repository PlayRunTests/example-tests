import { test, expect } from '@playwright/test';

// "Search & discovery" flows against the Playwright docs site.
// Domain: @search.
test.describe('Search & discovery', () => {
  test('the site loads', { tag: ['@search', '@smoke'] }, async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole('link', { name: 'Get started' }).first()).toBeVisible();
  });

  test('navigating into the docs works', { tag: ['@search', '@regression'] }, async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Docs' }).first().click();
    await expect(page).toHaveURL(/\/docs\//);
    await expect(page.getByRole('heading', { name: /Installation/i })).toBeVisible();
  });
});
