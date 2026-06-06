import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('Sauce Demo Inventory Page', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Inventory page title is Products', async ({ page }) => {
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('Inventory list is visible', async ({ page }) => {
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('Six products are displayed', async ({ page }) => {
    const count = await inventoryPage.inventoryItems.count();
    expect(count).toBe(6);
  });

  test('Sort products by price low to high', async ({ page }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  test('Cart badge updates when item added', async ({ page }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    const count = await inventoryPage.getCartCount();
    expect(count).toBe('1');
  });

  test('Logout navigates back to login page', async ({ page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
