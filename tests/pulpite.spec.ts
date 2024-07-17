import { test, expect } from '@playwright/test';

test.describe('User send money', () => {

  test('quick payment with correct data', async ({ page }) => {
    //Arrange

    const url = 'https://demo-bank.vercel.app/'
    const userId = 'kakaszek';
    const userPassword = '12345678';
    const expectedUserName = "Jan Demobankowy";
    const transferReceiver = '2';
    const transferAmount = '150';
    const transferTitle = 'Pizza';
    const expectedReceiverName = "Chuck Demobankowy";

    //Act

    await page.goto('url');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(transferReceiver);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();


    //Assert
    await expect(page.getByTestId('message-text')).toHaveText(`Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`);
  });

});