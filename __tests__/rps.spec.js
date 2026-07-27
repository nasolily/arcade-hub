import { test, expect } from '@playwright/test';
import { loginAndStart } from './auth.setup';

test('user can start game', async ({ page }) => {
  await loginAndStart(page);
});

test.describe('Rock Paper Scissors Game', () => {
  test('should play a round and show history after logging in', async ({ page }) => {
    // navigate through the lobby first
    await loginAndStart(page);

    // navigate to RPS
    await page.goto('https://github.com/nasolily/arcade-hub/#/game/rps');

    // click 'Rock'
    await page.getByRole('button', { name: 'Rock', exact: true }).click();

    // verify history badges exist
    const historyBadge = page.locator('.history-badge').first();
    await expect(historyBadge).toBeVisible();
    await expect(historyBadge).not.toContainText('?');
  });

  test('should reset the score correctly', async ({ page }) => {
    await loginAndStart(page);
    await page.goto('https://github.com/nasolily/arcade-hub/#/game/rps');

    await page.getByRole('button', { name: 'Paper', exact: true }).click();
    await page.getByRole('button', { name: /Reset Game/i }).click();

    //verify scores return to zero
    const playerScore = page.locator('.score-item .value').first();
    await expect(playerScore).toHaveText('0');
  });
});