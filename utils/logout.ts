import {expect} from '@playwright/test'

async function Logout(page: any) {
  await page.locator('#react-burger-menu-btn').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  await page.locator('#logout_sidebar_link').click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(/.*saucedemo\.com/);
}
export default Logout;  