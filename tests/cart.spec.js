import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import testData from '../utils/testData.js';

test.describe('Sauce Demo Cart', () => {
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
  });

  test('Add single item to cart', async () => {
    await inventoryPage.addItemToCartByName(testData.products.backpack);
    await inventoryPage.goToCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('Add three items to cart', async () => {
    await inventoryPage.addItemToCartByName(testData.products.backpack);
    await inventoryPage.addItemToCartByName(testData.products.bikeLight);
    await inventoryPage.addItemToCartByName(testData.products.boltTShirt);
    await inventoryPage.goToCart();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(3);
  });

  test('Add 3 items, remove one, checkout and verify thank you message', async () => {
    await inventoryPage.addItemToCartByName(testData.products.backpack);
    await inventoryPage.addItemToCartByName(testData.products.bikeLight);
    await inventoryPage.addItemToCartByName(testData.products.boltTShirt);
    await inventoryPage.goToCart();

    await cartPage.removeItemByName(testData.products.backpack);
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.checkout();
    await checkoutPage.fillDetails(testData.checkout.valid.firstName, testData.checkout.valid.lastName, testData.checkout.valid.postalCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    const message = await checkoutPage.getConfirmationMessage();
    expect(message).toBe('Thank you for your order!');
  });
});
