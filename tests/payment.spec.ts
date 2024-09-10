import { test, expect } from "@playwright/test";
import { loginData } from "../test.data/test.data";
import { text } from "stream/consumers";

test.describe("Payment", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://demo-bank.vercel.app/";
        const userId = loginData.userId;
        const userPassword = loginData.password;

        await page.goto(url);
        await page.getByTestId("login-input").fill(userId);
        await page.getByTestId("password-input").fill(userPassword);
        await page.getByTestId("login-button").click();
        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test("1. simple payment", async ({ page }) => {

        //Arrange

        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7891 2345 6789 1234 56781';
        const transferAmount = '222';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

        //Act


        await page.getByTestId('transfer_receiver').fill(transferReceiver);
        await page.getByTestId('form_account_to').fill(transferAccount);
        await page.getByTestId('form_amount').fill(transferAmount);
        await page.getByRole('button', { name: 'wykonaj przelew' }).click();
        await page.getByTestId('close-button').click();


        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});