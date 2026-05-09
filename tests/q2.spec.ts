import {test, expect} from '@playwright/test';

// const baseURL = 'https://www.saucedemo.com/';

test.describe('Standrad User Login, Cart, Checkout', () => {
    test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {

        // Login
        await page.goto("https://www.saucedemo.com/");
        await page.locator('#user-name').fill('standard_user');
        await page.waitForTimeout(2000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(2000);
        await page.locator('#login-button').click();
    });
});

// Helper Functions

// async function resetAppState(page) {
//   await page.locator('#react-burger-menu-btn').click();

//   await expect(page.locator('#reset_sidebar_link')).toBeVisible();

//   await page.locator('#reset_sidebar_link').click();

//   await page.locator('#react-burger-cross-btn').click();
// }

// async function logout(page) {
//   await page.locator('#react-burger-menu-btn').click();

//   await expect(page.locator('#logout_sidebar_link')).toBeVisible();

//   await page.locator('#logout_sidebar_link').click();

//   await expect(page).toHaveURL(/.*saucedemo\.com/);
// }
