import {expect} from '@playwright/test'

async function Checkout(page: any) {
    await page.locator('#first-name').fill('Saddam');
    await page.locator('#last-name').fill('Hossain');
    await page.locator('#postal-code').fill('1230');
    await page.locator('#continue').click();
}

export default Checkout;  