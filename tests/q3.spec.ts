import {test, expect} from '@playwright/test';
import Logout from '../utils/logout';
import Checkout from '../utils/Checkout';
import { BaseURL } from '../utils/BaseUrl';
import ResetAppState from '../utils/ResetAppState';

test.describe('Performance Glitch User Login, Filter, Cart, Checkout', () => {
    test('Login, Filter, Add First Item to Cart, Checkout, Logout', async ({page}) => {
        // Login
        await page.goto(BaseURL);
        await page.locator('#user-name').fill('performance_glitch_user');
        await page.waitForTimeout(1000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(1000);
        await page.locator('#login-button').click();

        // Reset App State
        await ResetAppState(page);

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

        // Click Checkout Button
        await page.locator("#checkout").click();

        //Checkout
        await Checkout(page);
        await page.waitForTimeout(1000);

        // Finish order
        await page.locator('#finish').click();
        await page.waitForTimeout(1000);
        
        // Verify success message
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
        await page.waitForTimeout(1000);

        //Logout
        await Logout(page);
    });
});
