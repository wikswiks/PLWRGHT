import { test, expect } from "@playwright/test";

test.describe("User send money BY PHONE", () => {
  test.only("pulpite.  number pop-up", async ({ page }) => {
    //Arrange

    const url = "https://demo-bank.vercel.app/";
    const userId = "kakaszek";
    const userPassword = "12345678";
    const expectedUserName = "Jan Demobankowy";
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "50";

    //Act

    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
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
});
