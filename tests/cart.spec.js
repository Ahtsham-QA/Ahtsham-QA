const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});

test('Add single item to cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.click('.shopping_cart_link');
  const items = await page.locator('.cart_item').count();
  expect(items).toBe(1);
});

test('Add three items to cart', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: 'Add to cart' });
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await addButtons.nth(2).click();
  await page.click('.shopping_cart_link');
  const items = await page.locator('.cart_item').count();
  expect(items).toBe(3);
});

test('Add 3 items, remove one, checkout and finish — verify thank you message', async ({ page }) => {
  const addButtons = page.getByRole('button', { name: 'Add to cart' });
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();
  await addButtons.nth(2).click();

  await page.click('.shopping_cart_link');

  // Remove one item
  await page.getByRole('button', { name: 'Remove' }).first().click();
  await expect(page.locator('.cart_item')).toHaveCount(2);

  // Checkout flow
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.fill('#first-name', 'A');
  await page.fill('#last-name', 'B');
  await page.fill('#postal-code', '22003');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

