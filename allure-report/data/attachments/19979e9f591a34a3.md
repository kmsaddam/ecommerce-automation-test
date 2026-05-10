# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2.spec.ts >> Standrad User Login, Cart, Checkout >> Login, Add Items to Cart, Checkout, Logout
- Location: tests\q2.spec.ts:6:9

# Error details

```
Error: locator.textContent: Error: strict mode violation: locator('.inventory_item_price') resolved to 3 elements:
    1) <div class="inventory_item_price" data-test="inventory-item-price">$29.99</div> aka getByText('$29.99')
    2) <div class="inventory_item_price" data-test="inventory-item-price">$9.99</div> aka getByText('$9.99')
    3) <div class="inventory_item_price" data-test="inventory-item-price">$15.99</div> aka getByText('$15.99')

Call log:
  - waiting for locator('.inventory_item_price')

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
  1   | import {test, expect} from '@playwright/test';
  2   | 
  3   | const baseURL = 'https://www.saucedemo.com/';
  4   | 
  5   | test.describe('Standrad User Login, Cart, Checkout', () => {
  6   |     test('Login, Add Items to Cart, Checkout, Logout', async ({page}) => {
  7   | 
  8   |         // Login
  9   |         await page.goto(baseURL);
  10  |         await page.locator('#user-name').fill('standard_user');
  11  |         await page.waitForTimeout(1000);
  12  |         await page.locator('#password').fill('secret_sauce');
  13  |         await page.waitForTimeout(1000);
  14  |         await page.locator('#login-button').click();
  15  | 
  16  |         // Reset App State
  17  |         await resetAppState(page);
  18  | 
  19  |         // Add any 3 items
  20  |         const productCards = page.locator('.inventory_item');
  21  |         const count = await productCards.count();  
  22  |         await page.waitForTimeout(1000);
  23  |         console.log(`Total products found: ${count}`);             
  24  |         const selectedProducts: { name: string; price: number }[] = [];
  25  | 
  26  |         for (let i = 0; i < 3 && i < count; i++) {
  27  |             const card = productCards.nth(i);
  28  | 
  29  |             const name = await card.locator('.inventory_item_name').textContent();
  30  |             const priceText = await card.locator('.inventory_item_price').textContent();
  31  | 
  32  |             selectedProducts.push({
  33  |                 name: name!.trim(),
  34  |                 price: parseFloat(priceText!.replace('$', '')),
  35  |             });
  36  | 
  37  |             await card.locator('button').click();
  38  |             await page.waitForTimeout(1000);
  39  | 
  40  |             console.log(name);
  41  |         }
  42  | 
  43  |         await page.locator('.shopping_cart_link').click();
  44  |         // Verify product items names in cart
  45  | 
  46  |         let cartPageItems = await page.locator('.inventory_item_name').allTextContents();
  47  |         // console.log(cartPageItems);
  48  |         let it = 0;
  49  |         for (const cardPageItem of cartPageItems) {
  50  |             // console.log(it);
  51  |             // console.log(selectedProducts[it].name);
  52  |             await expect(cartPageItems).toContain(selectedProducts[it].name)
  53  |             // await expect(page.locator('.inventory_item_name')).toContainText(selectedProducts[it].name!.trim());
  54  |             it++;
  55  | 
  56  |         }
  57  | 
  58  |         // Verify  items total price
  59  | 
> 60  |         const totalPriceSelector = await page.locator('.inventory_item_price').textContent()
      |                                                                                ^ Error: locator.textContent: Error: strict mode violation: locator('.inventory_item_price') resolved to 3 elements:
  61  |         const totalPriceCartPage = parseFloat(totalPriceSelector!.replace('$', ''));
  62  |         console.log(totalPriceCartPage);
  63  | 
  64  |         // // Start Checkout
  65  | 
  66  |         // await page.locator("#checkout").click();
  67  | 
  68  |         // //Checkout
  69  |         // await checkout(page);
  70  | 
  71  |         // // Finish order
  72  |         // await page.locator('#finish').click();
  73  |         
  74  |         // // Verify success message
  75  |         // await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  76  | 
  77  |         // //Logout
  78  |         // await logout(page);
  79  |         
  80  |     });
  81  | });
  82  | 
  83  | // Helper Functions
  84  | 
  85  | async function resetAppState(page:any) {
  86  | await page.waitForTimeout(1000);
  87  |   await page.locator('#react-burger-menu-btn').click();
  88  |   await page.waitForTimeout(1000);
  89  |   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  90  |   await page.waitForTimeout(1000);
  91  |   await page.locator('#reset_sidebar_link').click();
  92  |   await page.waitForTimeout(1000);
  93  |   await page.locator('#react-burger-cross-btn').click();
  94  |   await page.waitForTimeout(1000);
  95  | }
  96  | 
  97  | async function logout(page: any) {
  98  |   await page.locator('#react-burger-menu-btn').click();
  99  |   await page.waitForTimeout(1000);
  100 |   await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  101 |   await page.locator('#logout_sidebar_link').click();
  102 |   await page.waitForTimeout(1000);
  103 |   await expect(page).toHaveURL(/.*saucedemo\.com/);
  104 | }
  105 | 
  106 | async function checkout(page: any) {
  107 |     await page.locator('#first-name').fill('Saddam');
  108 |     await page.locator('#last-name').fill('Hossain');
  109 |     await page.locator('#postal-code').fill('1230');
  110 |     await page.locator('#continue').click();
  111 | }
  112 | 
```