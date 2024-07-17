import { test, expect } from '@playwright/test';

test.describe('User login to Demobankk', () => {
  test('login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('Kakaszek');
    await page.getByTestId('password-input').fill('Kakaszek');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText("Jan Demobankowy");
  });


  test('login with incorrect credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test');
    await page.getByTestId('password-input').click();


    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków");


  });

  test('too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('Kakaszek');
    await page.getByTestId('password-input').fill('Kak');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText("hasło ma min. 8 znaków");


  });

});