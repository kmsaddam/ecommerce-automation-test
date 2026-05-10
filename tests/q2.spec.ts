import {test, expect} from '@playwright/test';
import Logout from '../utils/logout';
import Checkout from '../utils/Checkout';
import ResetAppState from '../utils/ResetAppState';

const baseURL = 'https://www.saucedemo.com/';

test.describe('Standrad User Login, Cart, Checkout', () => {
    test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {

        // Login
        await page.goto(baseURL);
        await page.locator('#user-name').fill('standard_user');
        await page.waitForTimeout(1000);
        await page.locator('#password').fill('secret_sauce');
        await page.waitForTimeout(1000);
        await page.locator('#login-button').click();

        // Reset App State
        //await resetAppState(page);
        await ResetAppState(page);

        // Add any 3 items
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

        await page.locator('.shopping_cart_link').click();
        // Verify product items names in cart

        let cartPageItems = await page.locator('.inventory_item_name').allTextContents();
        // console.log(cartPageItems);
        let it = 0;
        for (const cardPageItem of cartPageItems) {
            // console.log(it);
            // console.log(selectedProducts[it].name);
         expect(cartPageItems).toContain(selectedProducts[it].name)
            // await expect(page.locator('.inventory_item_name')).toContainText(selectedProducts[it].name!.trim());
            it++;

        }

        // Verify  items total price

        const totalPriceSelector = await page.locator('.inventory_item_price').allTextContents();
        // const totalPriceCartPage = parseFloat(totalPriceSelector!.replace('$', ''));
        console.log(totalPriceSelector);
        const totalCartPrice = totalPriceSelector.reduce((sum, current) => {
                const num = parseFloat(current.replace(/[$,]/g, ''));
                return sum + num;
                }, 0);

                console.log(totalCartPrice);

        const selectedItemPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);
        console.log(selectedItemPrice);

        expect(totalCartPrice).toEqual(selectedItemPrice);


        // Start Checkout
        await page.locator("#checkout").click();

        //Checkout
        //await checkout(page);
        await Checkout(page);

        // Finish order
        await page.locator('#finish').click();
        
        // Verify success message
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

        //Logout
        //await logout(page);
        await Logout(page);
        
    });
});



