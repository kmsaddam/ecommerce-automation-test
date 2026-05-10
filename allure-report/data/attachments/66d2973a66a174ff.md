# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q1.spec.ts >> Locked Out User Test >> Login with locked_out_user and verify the error message
- Location: tests\q1.spec.ts:5:7

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Locked Out User Test', () => {
  4  | 
  5  |   test('Login with locked_out_user and verify the error message', async ({ page }) => {
  6  | 
  7  |     await test.step('Navigate to login page', async () => {
> 8  |       await page.goto('https://www.saucedemo.com/');
     |                  ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://www.saucedemo.com/
  9  |     });
  10 | 
  11 |     await page.waitForTimeout(2000);
  12 | 
  13 |     await test.step('Enter login credentials', async () => {
  14 |       await page.locator('#user-name').fill('locked_out_user');
  15 |       await page.locator('#password').fill('secret_sauce');
  16 |     });
  17 | 
  18 |     await page.waitForTimeout(2000);
  19 | 
  20 |     await test.step('Click login button', async () => {
  21 |       await page.locator('#login-button').click();
  22 |     });
  23 | 
  24 |     await page.waitForTimeout(2000);
  25 | 
  26 |     await test.step('Verify login error message is displayed', async () => {
  27 |       const error = page.locator('[data-test="error"]');
  28 | 
  29 |       await expect(error).toBeVisible();
  30 |       await expect(error).toHaveText(
  31 |         'Epic sadface: Sorry, this user has been locked out.'
  32 |       );
  33 | 
  34 |       await page.waitForTimeout(2000);
  35 |     });
  36 | 
  37 |   });
  38 | 
  39 | });
```