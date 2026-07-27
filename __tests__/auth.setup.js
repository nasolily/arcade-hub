import { expect } from '@playwright/test';

export async function loginAndStart(page) {
  await page.goto('https://github.com/nasolily/arcade-hub/#/lobby');

  // enter player name
  await page.locator('#player-name').fill('Nadia');

  // select first visible avatar option
  await page.locator('.avatar-option').first().click();

  //save settings
  const saveBtn = page.locator('#save-settings');
  await expect(saveBtn).toBeEnabled();
  await saveBtn.click();

  // confirm navigation away from lobby
  await expect(page).not.toHaveURL(/.*lobby/);
}