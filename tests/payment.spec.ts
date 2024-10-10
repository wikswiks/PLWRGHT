import { test, expect } from "@playwright/test";
import { loginData } from "../test.data/test.data";
import { text } from "stream/consumers";
import { LoginPage } from "../pages/login.pages";
import { PaymentsPage } from "../pages/payments.pages";

test.describe("Payment", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://demo-bank.vercel.app/";
        const userId = loginData.userId;
        const userPassword = loginData.password;

        await page.goto(url);
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();
        //await page.getByTestId("login-input").fill(userId);
        //await page.getByTestId("password-input").fill(userPassword);
        //await page.getByTestId("login-button").click();
        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test("1. simple payment", async ({ page }) => {

        //Arrange

        const paymentsPage = new PaymentsPage(page);
        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7891 2345 6789 1234 56781';
        const transferAmount = '222';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

        //Act


        await paymentsPage.getByTestId.elTransferReceiver.fill(transferReceiver);
        await paymentsPage.getByTestId.formAccountTo.fill(transferAccount);
        await paymentsPage.getByTestId.formAmount.fill(transferAmount);
        await paymentsPage.getByRole.wykonajButton.click();
        await paymentsPage.getByTestId.closeButton.click();


        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});