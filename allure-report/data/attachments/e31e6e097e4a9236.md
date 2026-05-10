# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2.spec.ts >> Standrad User Login, Cart, Checkout >> Login with standard_user, add 3 items to cart, verify cart and checkout
- Location: tests\q2.spec.ts:6:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#username')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | // const baseURL = 'https://www.saucedemo.com/';
  4  | 
  5  | test.describe('Standrad User Login, Cart, Checkout', () => {
  6  |     test('Login with standard_user, add 3 items to cart, verify cart and checkout', async ({page}) => {
  7  | 
  8  |      
  9  |         await page.goto("https://www.saucedemo.com/");
  10 |         await page.waitForTimeout(2000);
> 11 |         await page.locator('#username').fill('standard_user');
     |                                         ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  12 |         await page.waitForTimeout(2000);
  13 |         await page.locator('#password').fill('secret_sauce');
  14 |         await page.waitForTimeout(2000);
  15 |         await page.locator('#login-button').click();
  16 |         await page.waitForTimeout(2000);
  17 |     });
  18 | });
  19 | 
  20 | // Helper Functions
  21 | 
  22 | // async function resetAppState(page) {
  23 | //   await page.locator('#react-burger-menu-btn').click();
  24 | 
  25 | //   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  26 | 
  27 | //   await page.locator('#reset_sidebar_link').click();
  28 | 
  29 | //   await page.locator('#react-burger-cross-btn').click();
  30 | // }
  31 | 
  32 | // async function logout(page) {
  33 | //   await page.locator('#react-burger-menu-btn').click();
  34 | 
  35 | //   await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  36 | 
  37 | //   await page.locator('#logout_sidebar_link').click();
  38 | 
  39 | //   await expect(page).toHaveURL(/.*saucedemo\.com/);
  40 | // }
  41 | 
```