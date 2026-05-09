# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2.spec.ts >> Standrad User Login, Cart, Checkout >> Login, Add Items to Cart, Checkout, Logout
- Location: tests\q2.spec.ts:6:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.inventory_item_name')
Expected substring: "Sauce Labs Backpack"
Error: strict mode violation: locator('.inventory_item_name') resolved to 3 elements:
    1) <div class="inventory_item_name" data-test="inventory-item-name">Sauce Labs Backpack</div> aka locator('[data-test="item-4-title-link"]')
    2) <div class="inventory_item_name" data-test="inventory-item-name">Sauce Labs Bike Light</div> aka locator('[data-test="item-0-title-link"]')
    3) <div class="inventory_item_name" data-test="inventory-item-name">Sauce Labs Bolt T-Shirt</div> aka locator('[data-test="item-1-title-link"]')

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.inventory_item_name')

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
        - generic [ref=e14]: "3"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bike Light" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bike Light
            - generic [ref=e36]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e37]:
              - generic [ref=e38]: $9.99
              - button "Remove" [ref=e39] [cursor=pointer]
        - generic [ref=e40]:
          - generic [ref=e41]: "1"
          - generic [ref=e42]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bolt T-Shirt
            - generic [ref=e45]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e46]:
              - generic [ref=e47]: $15.99
              - button "Remove" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - button "Go back Continue Shopping" [ref=e50] [cursor=pointer]:
          - img "Go back" [ref=e51]
          - text: Continue Shopping
        - button "Checkout" [ref=e52] [cursor=pointer]
  - contentinfo [ref=e53]:
    - list [ref=e54]:
      - listitem [ref=e55]:
        - link "Twitter" [ref=e56] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e57]:
        - link "Facebook" [ref=e58] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e59]:
        - link "LinkedIn" [ref=e60] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e61]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | // const baseURL = 'https://www.saucedemo.com/';
  4  | 
  5  | test.describe('Standrad User Login, Cart, Checkout', () => {
  6  |     test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {
  7  | 
  8  |         // Login
  9  |         await page.goto("https://www.saucedemo.com/");
  10 |         await page.locator('#user-name').fill('standard_user');
  11 |         await page.waitForTimeout(1000);
  12 |         await page.locator('#password').fill('secret_sauce');
  13 |         await page.waitForTimeout(1000);
  14 |         await page.locator('#login-button').click();
  15 | 
  16 |         // Reset App State
  17 |         await resetAppState(page);
  18 | 
  19 |         // Add any 3 items
  20 |         const productCards = page.locator('.inventory_item');
  21 |         const count = await productCards.count();  
  22 |         await page.waitForTimeout(1000);
  23 |         console.log(`Total products found: ${count}`);             
  24 |         const selectedProducts: { name: string; price: number }[] = [];
  25 | 
  26 |         for (let i = 0; i < 3 && i < count; i++) {
  27 |             const card = productCards.nth(i);
  28 | 
  29 |             const name = await card.locator('.inventory_item_name').textContent();
  30 |             const priceText = await card.locator('.inventory_item_price').textContent();
  31 | 
  32 |             selectedProducts.push({
  33 |                 name: name!.trim(),
  34 |                 price: parseFloat(priceText!.replace('$', '')),
  35 |             });
  36 | 
  37 |             await card.locator('button').click();
  38 |             await page.waitForTimeout(1000);
  39 |         }
  40 | 
  41 |         await page.locator('.shopping_cart_link').click();
  42 |         // Verify product items names in cart
  43 |         for (const product of selectedProducts) {
> 44 |             await expect(page.locator('.inventory_item_name')).toContainText(
     |                                                                ^ Error: expect(locator).toContainText(expected) failed
  45 |                 product.name
  46 |             );
  47 |         }
  48 | 
  49 |         await page.waitForTimeout(1000);
  50 | 
  51 |         // Checkout
  52 |         //await checkout(page);
  53 | 
  54 |         // Logout
  55 |         //await logout(page);
  56 |         
  57 |     });
  58 | });
  59 | 
  60 | // Helper Functions
  61 | 
  62 | async function resetAppState(page:any) {
  63 | await page.waitForTimeout(1000);
  64 |   await page.locator('#react-burger-menu-btn').click();
  65 |   await page.waitForTimeout(1000);
  66 |   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  67 |   await page.waitForTimeout(1000);
  68 |   await page.locator('#reset_sidebar_link').click();
  69 |   await page.waitForTimeout(1000);
  70 |   await page.locator('#react-burger-cross-btn').click();
  71 |   await page.waitForTimeout(1000);
  72 | }
  73 | 
  74 | async function logout(page: any) {
  75 |   await page.locator('#react-burger-menu-btn').click();
  76 |   await page.waitForTimeout(1000);
  77 |   await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  78 |   await page.locator('#logout_sidebar_link').click();
  79 |   await page.waitForTimeout(1000);
  80 |   await expect(page).toHaveURL(/.*saucedemo\.com/);
  81 | }
  82 | 
  83 | async function checkout(page: any) {
  84 |     await page.locator('[data-test="firstName"]').fill('Jane');
  85 |     await page.locator('[data-test="lastName"]').fill('Smith');
  86 |     await page.locator('[data-test="postalCode"]').fill('2000');
  87 |     await page.locator('[data-test="continue"]').click();
  88 | }
  89 | 
```