import {expect} from '@playwright/test'

async function ResetAppState(page:any) {
await page.waitForTimeout(1000);
  await page.locator('#react-burger-menu-btn').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  await page.waitForTimeout(1000);
  await page.locator('#reset_sidebar_link').click();
  await page.waitForTimeout(1000);
  await page.locator('#react-burger-cross-btn').click();
  await page.waitForTimeout(1000);
}

export default ResetAppState;  