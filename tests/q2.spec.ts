import {test, expect} from '@playwright/test';

// const baseURL = 'https://www.saucedemo.com/';

test.describe('Standrad User Login, Cart, Checkout', () => {
    test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {

        // Login
        await page.goto("https://www.saucedemo.com/");
        await page.locator('#user-name').fill('standard_user');
        await page.waitForTimeout(1000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(1000);
        await page.locator('#login-button').click();

        // Reset App State
        await resetAppState(page);

        // Checkout
        await checkout(page);

        // Logout
        await logout(page);
        
    });
});

// Helper Functions

async function resetAppState(page:any) {
await page.waitForTimeout(1000);
  await page.locator('#react-burger-menu-btn').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator('#reset_sidebar_link').click();
  await page.waitForTimeout(1000);
  await page.locator('#react-burger-cross-btn').click();
  await page.waitForTimeout(1000);
}

async function logout(page: any) {
  await page.locator('#react-burger-menu-btn').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  await page.locator('#logout_sidebar_link').click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/.*saucedemo\.com/);
}

async function checkout(page: any) {
    await page.locator('[data-test="firstName"]').fill('Jane');
    await page.locator('[data-test="lastName"]').fill('Smith');
    await page.locator('[data-test="postalCode"]').fill('2000');
    await page.locator('[data-test="continue"]').click();
}
