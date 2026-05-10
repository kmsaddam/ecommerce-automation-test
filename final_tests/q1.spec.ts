import { test, expect } from '@playwright/test';
import { BaseURL } from '../utils/BaseUrl';

test.describe('Locked Out User Test', () => {
  test('Login with Locked Out User and verify the error message', async ({ page }) => {
    // Navigate to the login page
    await page.goto(BaseURL);
    // Wait for loading
    await page.waitForTimeout(1000);
    // Enter login credentials
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    // Wait for loading
    await page.waitForTimeout(1000);
    // Click Login Button
    await page.locator('#login-button').click();
    // Wait for loading
    await page.waitForTimeout(1500);
    // Verify error message
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});