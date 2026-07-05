import { test, expect } from '@playwright/test';

// Auth flows against the classic public "the-internet" login form.
// Domain: @auth (folder + tag). Type tags drive smoke/regression grouping.
const LOGIN = 'https://the-internet.herokuapp.com/login';

test.describe('Authentication', () => {
  test('a valid user can log in', { tag: ['@auth', '@smoke'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  });

  test('an invalid password is rejected', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('not-the-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });

  test('a logged-in user can log out', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    await page.goto(LOGIN);
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/secure/);

    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('.flash.success')).toContainText('You logged out');
  });
});
