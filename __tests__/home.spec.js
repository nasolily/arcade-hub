import { test, expect } from '@playwright/test';

const APP_URL = 'https://github.com/nasolily/arcade-hub/#/';

test('Home screen loads with the correct title', async ({ page }) => {
  await page.goto(APP_URL);
  
  // verify the main heading exists
  await expect(page.getByRole('heading', { name: /Welcome to PrismPlay/i })).toBeVisible();
});

test('Navigation bar is present and functional', async ({ page }) => {
  await page.goto(APP_URL);
  
  // check that the nav bar exists and navigate to the Lobby
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  
  await page.getByRole('link', { name: 'Lobby' }).click();
  await expect(page).toHaveURL(/.*lobby/);
});