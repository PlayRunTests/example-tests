import { test, expect, type Page } from '@playwright/test';

// "Account preferences" flows framed on the TodoMVC demo (filter + clear).
// Domain: @account.
const APP = 'https://demo.playwright.dev/todomvc';

async function seedPreferences(page: Page) {
  const input = page.getByPlaceholder('What needs to be done?');
  for (const pref of ['Update email', 'Change password', 'Enable 2FA']) {
    await input.fill(pref);
    await input.press('Enter');
  }
}

test.describe('Account — preferences', () => {
  test('filtering shows only the active preferences', { tag: ['@account', '@regression'] }, async ({ page }) => {
    await page.goto(APP);
    await seedPreferences(page);

    await page.getByRole('listitem').filter({ hasText: 'Enable 2FA' }).getByRole('checkbox').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-title')).toHaveCount(2);
  });

  test('completed preferences can be cleared', { tag: ['@account', '@sanity'] }, async ({ page }) => {
    await page.goto(APP);
    await seedPreferences(page);

    await page.getByRole('listitem').filter({ hasText: 'Update email' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByTestId('todo-title')).toHaveCount(2);
  });
});
