# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q3.spec.ts >> Performance Glitch User Login, Filter, Cart, Checkout >> Login, Filter, Add First Item to Cart, Checkout, Logout
- Location: tests\q3.spec.ts:8:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - generic:
            - generic [ref=e7]:
              - button "Open Menu" [ref=e8] [cursor=pointer]
              - img "Open Menu" [ref=e9]
            - generic [ref=e10]:
              - navigation [ref=e12]:
                - link [ref=e13] [cursor=pointer]:
                  - /url: "#"
                  - text: All Items
                - link [ref=e14] [cursor=pointer]:
                  - /url: https://saucelabs.com/
                  - text: About
                - link [ref=e15] [cursor=pointer]:
                  - /url: "#"
                  - text: Logout
                - link [ref=e16] [cursor=pointer]:
                  - /url: "#"
                  - text: Reset App State
              - generic [ref=e17]:
                - button [ref=e18] [cursor=pointer]: Close Menu
                - img [ref=e19]
        - generic [ref=e21]: Swag Labs
      - generic [ref=e25]: "Checkout: Complete!"
    - generic [ref=e26]:
      - img "Pony Express" [ref=e27]
      - heading "Thank you for your order!" [level=2] [ref=e28]
      - generic [ref=e29]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - button "Back Home" [ref=e30] [cursor=pointer]
  - contentinfo [ref=e31]:
    - list [ref=e32]:
      - listitem [ref=e33]:
        - link "Twitter" [ref=e34] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e35]:
        - link "Facebook" [ref=e36] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e37]:
        - link "LinkedIn" [ref=e38] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e39]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import {expect} from '@playwright/test'
  2  | 
  3  | async function ResetAppState(page:any) {
  4  | await page.waitForTimeout(1000);
  5  |   await page.locator('#react-burger-menu-btn').click();
  6  |   await page.waitForTimeout(1000);
  7  |   await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  8  |   await page.waitForTimeout(1000);
  9  |   await page.locator('#reset_sidebar_link').click();
  10 |   await page.waitForTimeout(1000);
  11 |   await page.locator('#react-burger-cross-btn').click();
> 12 |   await page.waitForTimeout(1000);
     |              ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  13 | }
  14 | 
  15 | export default ResetAppState;  
```