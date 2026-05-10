# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2.spec.ts >> Standrad User Login, Cart, Checkout >> Login, Add Items to Cart, Checkout, Logout
- Location: tests\q2.spec.ts:9:9

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: www.saucedemo.com
      - text: ’s DNS address could not be found. Diagnosing the problem.
    - generic [ref=e10]:
      - paragraph
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "Try running Windows Network Diagnostics" [ref=e13] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
          - text: .
    - generic [ref=e14]: DNS_PROBE_STARTED
  - button "Reload" [ref=e17] [cursor=pointer]
```

# Test source

```ts
  1   | import {test, expect} from '@playwright/test';
  2   | import Logout from '../utils/logout';
  3   | import Checkout from '../utils/Checkout';
  4   | import ResetAppState from '../utils/ResetAppState';
  5   | 
  6   | const baseURL = 'https://www.saucedemo.com/';
  7   | 
  8   | test.describe('Standrad User Login, Cart, Checkout', () => {
  9   |     test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {
  10  | 
  11  |         // Login
> 12  |         await page.goto(baseURL);
      |                    ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
  13  |         await page.locator('#user-name').fill('standard_user');
  14  |         await page.waitForTimeout(1000);
  15  |         await page.locator('#password').fill('secret_sauce');
  16  |         await page.waitForTimeout(1000);
  17  |         await page.locator('#login-button').click();
  18  | 
  19  |         // Reset App State
  20  |         //await resetAppState(page);
  21  |         await ResetAppState(page);
  22  | 
  23  |         // Add any 3 items
  24  |         const productCards = page.locator('.inventory_item');
  25  |         const count = await productCards.count();  
  26  |         await page.waitForTimeout(1000);
  27  |         console.log(`Total products found: ${count}`);             
  28  |         const selectedProducts: { name: string; price: number }[] = [];
  29  | 
  30  |         for (let i = 0; i < 3 && i < count; i++) {
  31  |             const card = productCards.nth(i);
  32  | 
  33  |             const name = await card.locator('.inventory_item_name').textContent();
  34  |             const priceText = await card.locator('.inventory_item_price').textContent();
  35  | 
  36  |             selectedProducts.push({
  37  |                 name: name!.trim(),
  38  |                 price: parseFloat(priceText!.replace('$', '')),
  39  |             });
  40  | 
  41  |             await card.locator('button').click();
  42  |             await page.waitForTimeout(1000);
  43  | 
  44  |             console.log(name);
  45  |         }
  46  | 
  47  |         await page.locator('.shopping_cart_link').click();
  48  |         // Verify product items names in cart
  49  | 
  50  |         let cartPageItems = await page.locator('.inventory_item_name').allTextContents();
  51  |         // console.log(cartPageItems);
  52  |         let it = 0;
  53  |         for (const cardPageItem of cartPageItems) {
  54  |             // console.log(it);
  55  |             // console.log(selectedProducts[it].name);
  56  |          expect(cartPageItems).toContain(selectedProducts[it].name)
  57  |             // await expect(page.locator('.inventory_item_name')).toContainText(selectedProducts[it].name!.trim());
  58  |             it++;
  59  | 
  60  |         }
  61  | 
  62  |         // Verify  items total price
  63  | 
  64  |         const totalPriceSelector = await page.locator('.inventory_item_price').allTextContents();
  65  |         // const totalPriceCartPage = parseFloat(totalPriceSelector!.replace('$', ''));
  66  |         console.log(totalPriceSelector);
  67  |         const totalCartPrice = totalPriceSelector.reduce((sum, current) => {
  68  |                 const num = parseFloat(current.replace(/[$,]/g, ''));
  69  |                 return sum + num;
  70  |                 }, 0);
  71  | 
  72  |                 console.log(totalCartPrice);
  73  | 
  74  |         const selectedItemPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);
  75  |         console.log(selectedItemPrice);
  76  | 
  77  |         expect(totalCartPrice).toEqual(selectedItemPrice)
  78  |         // Start Checkout
  79  | 
  80  |         await page.locator("#checkout").click();
  81  | 
  82  |         //Checkout
  83  |         //await checkout(page);
  84  |         await Checkout(page);
  85  | 
  86  |         // Finish order
  87  |         await page.locator('#finish').click();
  88  |         
  89  |         // Verify success message
  90  |         await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  91  | 
  92  |         //Logout
  93  |         //await logout(page);
  94  | 
  95  |         await Logout(page);
  96  |         
  97  |     });
  98  | });
  99  | 
  100 | // Helper Functions
  101 | 
  102 | async function resetAppState(page:any) {
  103 | await page.waitForTimeout(1000);
  104 |   await page.locator('#react-burger-menu-btn').click();
  105 |   await page.waitForTimeout(1000);
  106 |   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  107 |   await page.waitForTimeout(1000);
  108 |   await page.locator('#reset_sidebar_link').click();
  109 |   await page.waitForTimeout(1000);
  110 |   await page.locator('#react-burger-cross-btn').click();
  111 |   await page.waitForTimeout(1000);
  112 | }
```