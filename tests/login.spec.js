import percySnapshot from '@percy/playwright';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import testData from '../utils/testData.js';

test.describe('Sauce Demo Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid login with standard_user', async ({ page }) => {
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await percySnapshot(page, 'Login Page');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Invalid credentials shows error', async ({ page }) => {
    await loginPage.login(testData.users.invalid.username, testData.users.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('Empty fields shows validation error', async ({ page }) => {
    await loginPage.login('', '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username is required');
  });
});
