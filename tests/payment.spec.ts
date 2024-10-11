import { test, expect } from "@playwright/test";
import { loginData } from "../test.data/test.data";
import { LoginPage } from "../pages/login.pages";
import { PaymentsPage } from "../pages/payments.pages";

test.describe("Payment", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://demo-bank.vercel.app/";
        const userId = loginData.userId;
        const userPassword = loginData.password;
        const loginPage = new LoginPage(page);

        await page.goto(url);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();
        await page.getByRole('link', { name: 'płatności' }).click();
        
    });

    test("1. simple payment", async ({ page }) => {

        //Arrange

       
        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7891 2345 6789 1234 56781';
        const transferAmount = '222';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

        //Act
        const paymentsPage = new PaymentsPage(page);
        await paymentsPage.elTransferReceiver.fill(transferReceiver);
        await paymentsPage.formAccountTo.fill(transferAccount);
        await paymentsPage.formAmount.fill(transferAmount);
        await paymentsPage.wykonajButton.click();
        await paymentsPage.closeButton.click();

     

        //Assert
        await expect(paymentsPage.showMessage).toHaveText(expectedMessage);
    });
});