import {test, expect} from '@playwright/test';
import Logout from '../utils/logout';

const baseURL = 'https://www.saucedemo.com/';

test.describe('Performance Glitch User Login, Filter, Cart, Checkout', () => {
    test('Login, Filter, Add First Item to Cart, Checkout, Logout', async ({page}) => {

        // Login
        await page.goto(baseURL);
        await page.locator('#user-name').fill('performance_glitch_user');
        await page.waitForTimeout(1000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(1000);
        await page.locator('#login-button').click();

        // Reset App State
        await resetAppState(page);

        // Filter Z to A
        await page.locator('[data-test="product-sort-container"]').selectOption({label: 'Name (Z to A)'});
        await page.waitForTimeout(2000);
        
        // Add first item to cart
        const firstProduct = page.locator('.inventory_item').first();
        const firstItemName = await firstProduct.locator('.inventory_item_name').textContent();
        const firstItemPrice = await firstProduct.locator('.inventory_item_price').textContent();

        console.log(firstItemName);
        await firstProduct.locator('button').click();
        await page.waitForTimeout(1000);
        
        await page.locator('.shopping_cart_link').click();

        // Verify product in cart
        const cartProduct = page.locator('.cart_item').first();
        const cartItemName = await cartProduct.locator('.inventory_item_name').textContent();
        const cartItemPrice = await cartProduct.locator('.inventory_item_price').textContent();

        console.log(cartItemName);
        // Verify product item name in cart
        expect(firstItemName).toEqual(cartItemName);

        // Verify product item price in cart
        expect(firstItemPrice).toEqual(cartItemPrice);

        // Start Checkout

        await page.locator("#checkout").click();

        //Checkout
        await checkout(page);

        // Finish order
        await page.locator('#finish').click();
        
        // Verify success message
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

        //Logout
        await Logout(page);
        
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
    await page.locator('#first-name').fill('Saddam');
    await page.locator('#last-name').fill('Hossain');
    await page.locator('#postal-code').fill('1230');
    await page.locator('#continue').click();
}
