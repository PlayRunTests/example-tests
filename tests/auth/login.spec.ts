import { test, expect } from '@playwright/test';

// Auth flows against the SauceLabs demo shop (CDN-hosted, very reliable).
// Domain: @auth (folder + tag). Type tags drive smoke/regression grouping.
const LOGIN = 'https://www.saucedemo.com/';

test.describe('Authentication', () => {
  test('a valid user can log in', { tag: ['@auth', '@smoke'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('an invalid password is rejected', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('not-the-password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match',
    );
  });

  test('a logged-in user can log out', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
