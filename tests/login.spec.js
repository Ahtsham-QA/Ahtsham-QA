import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Sauce Demo Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('Successful Login', () => {
    test('Valid login with standard_user', async ({ page }) => {
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
      await expect(page.locator('.title')).toHaveText('Products');
    });
  });

  test.describe('Failed Login', () => {
    test('Invalid credentials shows error', async ({ page }) => {
      await loginPage.login('invalid_user', 'wrong_password');
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    test('Empty fields shows validation error', async ({ page }) => {
      await loginPage.login('', '');
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('Epic sadface: Username is required');
    });
  });
});
