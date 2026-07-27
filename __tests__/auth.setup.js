import { expect } from '@playwright/test';

export async function loginAndStart(page) {
  await page.goto('https://it3049c-lively-fa23.github.io/final-project-nadia-cowins/#/lobby');

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