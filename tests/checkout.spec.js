import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Sauce Demo Checkout', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });

  test('Checkout with valid details completes successfully', async ({ page }) => {
    await checkoutPage.fillDetails('John', 'Doe', '22003');
    await checkoutPage.continue();
    await checkoutPage.finish();
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe('Thank you for your order!');
  });

  test('Checkout with empty first name shows error', async ({ page }) => {
    await checkoutPage.fillDetails('', 'Doe', '22003');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('Checkout with empty last name shows error', async ({ page }) => {
    await checkoutPage.fillDetails('John', '', '22003');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('Checkout with empty postal code shows error', async ({ page }) => {
    await checkoutPage.fillDetails('John', 'Doe', '');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });
});
