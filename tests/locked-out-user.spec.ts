import { test, expect } from '@playwright/test';

test.describe('Locked Out User Test', () => {

  test('Login with locked_out_user and verify the error message', async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await page.waitForTimeout(2000);

    await test.step('Enter login credentials', async () => {
      await page.locator('#user-name').fill('locked_out_user');
      await page.locator('#password').fill('secret_sauce');
    });

    await page.waitForTimeout(2000);

    await test.step('Click login button', async () => {
      await page.locator('#login-button').click();
    });

    await page.waitForTimeout(2000);

    await test.step('Verify login error message is displayed', async () => {
      const error = page.locator('[data-test="error"]');

      await expect(error).toBeVisible();
      await expect(error).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
      );

      await page.waitForTimeout(2000);
    });

  });

});