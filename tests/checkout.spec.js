import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import testData from '../utils/testData.js';

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
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await expect(page).toHaveURL(/inventory.html/);
    await inventoryPage.addItemToCartByName(testData.products.backpack);
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });

  test('Checkout with valid details completes successfully', async () => {
    await checkoutPage.fillDetails(testData.checkout.valid.firstName, testData.checkout.valid.lastName, testData.checkout.valid.postalCode);
    await checkoutPage.continue();
    await checkoutPage.finish();
    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe('Thank you for your order!');
  });

  test('Checkout with empty first name shows error', async () => {
    await checkoutPage.fillDetails('', testData.checkout.valid.lastName, testData.checkout.valid.postalCode);
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain(testData.checkout.errors.missingFirstName);
  });

  test('Checkout with empty last name shows error', async () => {
    await checkoutPage.fillDetails(testData.checkout.valid.firstName, '', testData.checkout.valid.postalCode);
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain(testData.checkout.errors.missingLastName);
  });

  test('Checkout with empty postal code shows error', async () => {
    await checkoutPage.fillDetails(testData.checkout.valid.firstName, testData.checkout.valid.lastName, '');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain(testData.checkout.errors.missingPostalCode);
  });
});
