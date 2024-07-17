import { test, expect } from '@playwright/test';


test.describe('User send money BY PHONE', () => {

    test('pulpite.  number pop-up', async ({ page }) => {

        const url = 'https://demo-bank.vercel.app/'
        const user name = 'kakaszek';

        await page.goto(url);
        await page.getByTestId('login-input').fill(user name);
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('50');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();


        await expect(page.getByTestId('message-text')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx');

    });

});






