import { test, expect } from '@playwright/test';

const SAUCE_DEMO_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Sauce Demo cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SAUCE_DEMO_URL);
    await page.fill('[data-test="username"]', USERNAME);
    await page.fill('[data-test="password"]', PASSWORD);
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  test('Add single item to cart', async ({ page }) => {
    const firstAddButton = page.locator('.inventory_item button').first();
    await firstAddButton.click();

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Add multiple items', async ({ page }) => {
    const addButtons = page.locator('.inventory_item button');
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });

  test('Remove item from cart', async ({ page }) => {
    const addButtons = page.locator('.inventory_item button');
    await addButtons.first().click();

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.click('.cart_item button');
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('Navigate to cart page', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });
});
