import { test } from '@playwright/test';

test('google search world news and open shopping from more', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Accept cookie/privacy prompt if shown.
  const acceptButton = page.getByRole('button', { name: /I agree|Accept all|Agree/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const searchInput = page.locator('[name="q"]').first();
  await searchInput.waitFor({ state: 'visible', timeout: 20000 });
  await searchInput.fill('World news');
  await page.keyboard.press('Enter');

  await page.waitForLoadState('networkidle');

  // Click the More menu and choose Shopping.
  const moreButton = page.locator('text=More').first();
  await moreButton.waitFor({ state: 'visible', timeout: 10000 });
  await moreButton.click();

  const shoppingItem = page.locator('text=Shopping').first();
  await shoppingItem.waitFor({ state: 'visible', timeout: 10000 });
  await shoppingItem.click();

  await page.waitForLoadState('networkidle');
});