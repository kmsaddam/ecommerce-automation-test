# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q3.spec.ts >> Performance Glitch User Login, Filter, Cart, Checkout >> Login, Filter, Add First Item to Cart, Checkout, Logout
- Location: tests\q3.spec.ts:6:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.inventory_item').first().locator('.inventory_item_name')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "1"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e27]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
            - generic [ref=e28]:
              - generic [ref=e29]: $15.99
              - button "Remove" [ref=e30] [cursor=pointer]
      - generic [ref=e31]:
        - button "Go back Continue Shopping" [ref=e32] [cursor=pointer]:
          - img "Go back" [ref=e33]
          - text: Continue Shopping
        - button "Checkout" [ref=e34] [cursor=pointer]
  - contentinfo [ref=e35]:
    - list [ref=e36]:
      - listitem [ref=e37]:
        - link "Twitter" [ref=e38] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e39]:
        - link "Facebook" [ref=e40] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e41]:
        - link "LinkedIn" [ref=e42] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e43]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | const baseURL = 'https://www.saucedemo.com/';
  4  | 
  5  | test.describe('Performance Glitch User Login, Filter, Cart, Checkout', () => {
  6  |     test('Login, Filter, Add First Item to Cart, Checkout, Logout', async ({page}) => {
  7  | 
  8  |         // Login
  9  |         await page.goto(baseURL);
  10 |         await page.locator('#user-name').fill('performance_glitch_user');
  11 |         await page.waitForTimeout(1000);
  12 |         await page.locator('#password').fill('secret_sauce');
  13 |         await page.waitForTimeout(1000);
  14 |         await page.locator('#login-button').click();
  15 | 
  16 |         // Reset App State
  17 |         await resetAppState(page);
  18 | 
  19 |         // Filter Z to A
  20 |         await page.locator('[data-test="product-sort-container"]').selectOption({label: 'Name (Z to A)'});
  21 |         await page.waitForTimeout(2000);
  22 |         
  23 |         // Add first item to cart
  24 |         const firstProduct = page.locator('.inventory_item').first();
  25 |         const firstItemName = await firstProduct.locator('.inventory_item_name').textContent();
  26 |         const firstItemPrice = await firstProduct.locator('.inventory_item_price').textContent();
  27 | 
  28 |         console.log(firstItemName);
  29 |         await firstProduct.locator('button').click();
  30 |         await page.waitForTimeout(1000);
  31 |         
  32 |         await page.locator('.shopping_cart_link').click();
  33 | 
  34 |         // Verify product in cart
  35 |         const cartProduct = page.locator('.inventory_item').first();
> 36 |         const cartItemName = await cartProduct.locator('.inventory_item_name').textContent();
     |                                                                                ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  37 |         const cartItemPrice = await cartProduct.locator('.inventory_item_price').textContent();
  38 | 
  39 |         console.log(cartItemName);
  40 |         // // Verify product item name in cart
  41 |         // expect(firstItemName).toEqual(cartItemName);
  42 | 
  43 |         // // Verify product item price in cart
  44 |         // expect(firstItemPrice).toEqual(cartItemPrice);
  45 | 
  46 |         // // Start Checkout
  47 | 
  48 |         // await page.locator("#checkout").click();
  49 | 
  50 |         // //Checkout
  51 |         // await checkout(page);
  52 | 
  53 |         // // Finish order
  54 |         // await page.locator('#finish').click();
  55 |         
  56 |         // // Verify success message
  57 |         // await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  58 | 
  59 |         // //Logout
  60 |         // await logout(page);
  61 |         
  62 |     });
  63 | });
  64 | 
  65 | // Helper Functions
  66 | 
  67 | async function resetAppState(page:any) {
  68 | await page.waitForTimeout(1000);
  69 |   await page.locator('#react-burger-menu-btn').click();
  70 |   await page.waitForTimeout(1000);
  71 |   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  72 |   await page.waitForTimeout(1000);
  73 |   await page.locator('#reset_sidebar_link').click();
  74 |   await page.waitForTimeout(1000);
  75 |   await page.locator('#react-burger-cross-btn').click();
  76 |   await page.waitForTimeout(1000);
  77 | }
  78 | 
  79 | async function logout(page: any) {
  80 |   await page.locator('#react-burger-menu-btn').click();
  81 |   await page.waitForTimeout(1000);
  82 |   await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  83 |   await page.locator('#logout_sidebar_link').click();
  84 |   await page.waitForTimeout(1000);
  85 |   await expect(page).toHaveURL(/.*saucedemo\.com/);
  86 | }
  87 | 
  88 | async function checkout(page: any) {
  89 |     await page.locator('#first-name').fill('Saddam');
  90 |     await page.locator('#last-name').fill('Hossain');
  91 |     await page.locator('#postal-code').fill('1230');
  92 |     await page.locator('#continue').click();
  93 | }
  94 | 
```