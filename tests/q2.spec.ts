import {test, expect} from '@playwright/test';
import Logout from '../utils/logout';
import Checkout from '../utils/Checkout';
import ResetAppState from '../utils/ResetAppState';
import { BaseURL } from '../utils/BaseUrl';

test.describe('Standrad User Login, Cart, Checkout', () => {
    test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {
        // Login
        await page.goto(BaseURL);
        await page.locator('#user-name').fill('standard_user');
        await page.waitForTimeout(1000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(1000);
        await page.locator('#login-button').click();

        // Reset App State
        await ResetAppState(page);

        // Add 3 items to cart
        const productCards = page.locator('.inventory_item');
        const count = await productCards.count();  
        await page.waitForTimeout(1000);
        console.log(`Total products found: ${count}`);             
        const selectedProducts: { name: string; price: number }[] = [];

        for (let i = 0; i < 3 && i < count; i++) {
            const card = productCards.nth(i);

            const name = await card.locator('.inventory_item_name').textContent();
            const priceText = await card.locator('.inventory_item_price').textContent();

            selectedProducts.push({
                name: name!.trim(),
                price: parseFloat(priceText!.replace('$', '')),
            });

            await card.locator('button').click();
            await page.waitForTimeout(1000);

            console.log(name);
        }

        // Go to cart page
        await page.locator('.shopping_cart_link').click();
        await page.waitForTimeout(1000);

        // Click Checkout Button
        await page.locator("#checkout").click();
        await page.waitForTimeout(1000);

        //Checkout Page 
        //await checkout(page);
        await Checkout(page);
        await page.waitForTimeout(1000);

        // Verify product items names in cart
        let cartPageItems = await page.locator('.inventory_item_name').allTextContents();
        let it = 0;
        for (const cardPageItem of cartPageItems) {
            // console.log(it);
            // console.log(selectedProducts[it].name);
            expect(cartPageItems).toContain(selectedProducts[it].name)
            // await expect(page.locator('.inventory_item_name')).toContainText(selectedProducts[it].name!.trim());
            it++;
        }

        await page.waitForTimeout(1000);

        // Verify  items total in Final Checkout Page
        const totalPriceSelector = await page.locator('.inventory_item_price').allTextContents();
        // const totalPriceCartPage = parseFloat(totalPriceSelector!.replace('$', ''));
        console.log(totalPriceSelector);
        // const totalCartPrice = totalPriceSelector.reduce((sum, current) => {
        //         const num = parseFloat(current.replace(/[$,]/g, ''));
        //         return sum + num;
        //         }, 0);

        //         console.log(totalCartPrice);

        const selectedItemPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);
        console.log(selectedItemPrice);


        //Subtotal Price in Final Checkout Page
        const subtotalText = await page.locator('.summary_subtotal_label').textContent();
        const subtotalPrice = parseFloat(subtotalText!.replace('Item total: $', ''));
        console.log(subtotalPrice);
        expect(subtotalPrice).toEqual(selectedItemPrice);

        await page.waitForTimeout(1000);
        // Finish order
        await page.locator('#finish').click();
        
        // Verify success message
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

        // Reset App State
        await ResetAppState(page);
        
        //Logout
        //await logout(page);
        await Logout(page);
    });
});



