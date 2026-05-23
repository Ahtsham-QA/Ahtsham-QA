import { test, expect } from '@playwright/test';

test.describe('Sauce Demo login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test.describe('Successful login', () => {
    test('Valid login with standard_user and secret_sauce', async ({ page }) => {
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');

      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
      await expect(page.locator('.title')).toHaveText('Products');
    });
  });

  test.describe('Failed login', () => {
    test('Invalid login shows error', async ({ page }) => {
      await page.fill('#user-name', 'invalid_user');
      await page.fill('#password', 'wrong_password');
      await page.click('#login-button');

      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    test('Empty fields shows validation error', async ({ page }) => {
      await page.click('#login-button');

      const error = page.locator('[data-test="error"]');
      await expect(error).toBeVisible();
      await expect(error).toContainText('Epic sadface: Username is required');
    });
  });
});
