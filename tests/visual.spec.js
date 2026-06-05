import { test, expect } from '@playwright/test';
import { percySnapshot } from '@percy/playwright';

const LOGIN_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Visual Regression Tests - saucedemo.com', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(LOGIN_URL);
    });

    test('Login page visual snapshot', async ({ page }) => {
      await percySnapshot(page, 'Login Page');
    });
  });

  test.describe('Products Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(LOGIN_URL);
      await page.fill('#user-name', STANDARD_USER);
      await page.fill('#password', PASSWORD);
      await page.click('#login-button');
      await page.waitForURL(/inventory.html/);
    });

    test('Products page visual snapshot', async ({ page }) => {
      await percySnapshot(page, 'Products Page');
    });

    test('Products page with scrolled content', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await percySnapshot(page, 'Products Page - Scrolled');
    });
  });

  test.describe('Cart Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(LOGIN_URL);
      await page.fill('#user-name', STANDARD_USER);
      await page.fill('#password', PASSWORD);
      await page.click('#login-button');
      await page.waitForURL(/inventory.html/);

      // Add items to cart
      await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
      await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

      // Navigate to cart
      await page.click('.shopping_cart_link');
      await page.waitForURL(/cart.html/);
    });

    test('Cart page visual snapshot', async ({ page }) => {
      await percySnapshot(page, 'Cart Page');
    });
  });
});