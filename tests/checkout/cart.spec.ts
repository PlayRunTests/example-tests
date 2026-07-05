import { test, expect } from '@playwright/test';

// "Cart" flows framed on the canonical Playwright TodoMVC demo.
// Domain: @checkout.
const APP = 'https://demo.playwright.dev/todomvc';

test.describe('Checkout — cart', () => {
  test('items can be added to the cart', { tag: ['@checkout', '@smoke'] }, async ({ page }) => {
    await page.goto(APP);
    const input = page.getByPlaceholder('What needs to be done?');
    for (const item of ['Keyboard', 'Mouse', 'Monitor']) {
      await input.fill(item);
      await input.press('Enter');
    }
    await expect(page.getByTestId('todo-title')).toHaveCount(3);
  });

  test('fulfilling an item updates the remaining count', { tag: ['@checkout', '@regression'] }, async ({ page }) => {
    await page.goto(APP);
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Keyboard');
    await input.press('Enter');
    await input.fill('Mouse');
    await input.press('Enter');

    await page.getByRole('listitem').filter({ hasText: 'Keyboard' }).getByRole('checkbox').check();
    await expect(page.getByText('1 item left')).toBeVisible();
  });

  test('an item can be removed from the cart', { tag: ['@checkout', '@regression'] }, async ({ page }) => {
    await page.goto(APP);
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Keyboard');
    await input.press('Enter');

    const item = page.getByRole('listitem').filter({ hasText: 'Keyboard' });
    await item.hover();
    await item.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByTestId('todo-title')).toHaveCount(0);
  });
});
