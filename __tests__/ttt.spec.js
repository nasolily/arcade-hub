import { test, expect } from '@playwright/test';
import { loginAndStart } from './auth.setup.js';

test('user can start game', async ({ page }) => {
  await loginAndStart(page);
});

test.describe('Tic-Tac-Toe Game Logic', () => {
  
  test.beforeEach(async ({ page }) => {
    // navigate and login
    await loginAndStart(page);
    await page.goto('https://nasolily.github.io/arcade-hub/#/game/tic-tac-toe');
    
    // safety check: wait for the board to render
    await expect(page.locator('.game-board')).toBeVisible();
  });

  test('should alternate turns between X and O', async ({ page }) => {
    const squares = page.locator('.square');

    // turn 1: X
    await squares.nth(0).click();
    await expect(squares.nth(0)).toHaveText('X');

    //check status update
    await expect(page.locator('.status')).toContainText('Next player: O');

    //turn 2: O
    await squares.nth(1).click();
    await expect(squares.nth(1)).toHaveText('O');
  });

  test('should clear the board when Play Again is clicked', async ({ page }) => {
    const squares = page.locator('.square');
    
    // play a quick game where X wins
    await squares.nth(0).click(); // X
    await squares.nth(3).click(); // O
    await squares.nth(1).click(); // X
    await squares.nth(4).click(); // O
    await squares.nth(2).click(); // X - X wins

    //wait for the button to appear in the DOM, then visible, then click
    const resetBtn = page.getByRole('button', { name: /Play Again/i });
    await resetBtn.waitFor({ state: 'visible' }); 
    await resetBtn.click();

    // verify the board is reset
    await expect(squares.nth(0)).toHaveText('');
    await expect(page.locator('.status')).toContainText('Next player: X');
  });
});