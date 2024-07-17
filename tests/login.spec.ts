import { test, expect } from '@playwright/test';


test.describe('User login to Demobankk', () => {
  
  test.only('login with correct credentials', async ({ page }) => {

    //Arrange

    const url = 'https://demo-bank.vercel.app/'
    const userId = 'kakaszek';
    const userPassword = '12345678';
    const expectedUserName = "Jan Demobankowy";

    //Act

    await page.goto('url');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert 

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });


  test('login with incorrect credentials', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('test');
    await page.getByTestId('password-input').click();


    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków");


  });

  test('too short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('Kakaszek');
    await page.getByTestId('password-input').fill('Kak');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText("hasło ma min. 8 znaków");


  });

});