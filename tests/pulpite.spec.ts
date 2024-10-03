import { test, expect } from "@playwright/test";
import { loginData } from "../test.data/test.data";
import { LoginPage } from "../pages/login.pages";
import { PulpitePage } from "../pages/pulpite.pages";

test.describe("User send money", () => {

  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const loginPage = new LoginPage(page);
    await page.goto(url);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    ///await page.getByTestId("login-input").fill(userId);
    ///await page.getByTestId("password-input").fill(userPassword);
    ///await page.getByTestId("login-button").click();

  })


  test("1. quick send with correct data", async ({ page }) => {
    //Arrange
    const pulpitePage = new PulpitePage(page);
    const transferReceiver = "2";
    const transferAmount = "150";
    const transferTitle = "Pizza";
    const expectedReceiverName = "Chuck Demobankowy";

    //Act
   
    
    await pulpitePage.elChooseReceiver.selectOption(transferReceiver);
    await pulpitePage.elTransferAmount.fill(transferAmount);
    await pulpitePage.elTransferTitle.fill(transferTitle);
    await pulpitePage.wykonajButton.click();
    await pulpitePage.closeButton.click();

    //Assert

    await expect(pulpitePage.messageText).toHaveText(
      `Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });



  test("2. send by number pop-up", async ({ page }) => {

    //Arrange

    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";

    //Act

    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    //Assert

    await expect(page.getByTestId("message-text")).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`,
    );
  });


  test("3. correct balance after send by number", async ({ page }) => {

    //Arrange

    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    //Act

    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();

    //Assert

    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);


  });
});