import { test, expect } from '@playwright/test';

test.describe('User send money', () => {

test('quick payment with correct data', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('kakaszek');
  await page.getByTestId('password-input').fill('password');
  await page.getByTestId('login-button').click();
  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').fill('150'); 
  await page.locator('#widget_1_transfer_title').fill('Pizza');
  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByTestId('close-button').click();
 

  await expect(page.getByTestId('message-text')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Pizza');
});

});