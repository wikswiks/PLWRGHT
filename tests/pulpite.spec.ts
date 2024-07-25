import { test, expect } from "@playwright/test";

test.describe("User send money", () => {
  const userId = "kakaszek";
  const userPassword = "12345678";
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/"; 
    await page.goto(url);
  
  
  })
  
  test("1. quick send with correct data", async ({ page }) => {
    //Arrange

   
    
    
    const expectedUserName = "Jan Demobankowy";
    const transferReceiver = "2";
    const transferAmount = "150";
    const transferTitle = "Pizza";
    const expectedReceiverName = "Chuck Demobankowy";

    //Act

   
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page
      .locator("#widget_1_transfer_receiver")
      .selectOption(transferReceiver);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.getByTestId("message-text")).toHaveText(
      `Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });



    test("2. send by number pop-up", async ({ page }) => {
      
      //Arrange
  
   
     
      
      const expectedUserName = "Jan Demobankowy";
      const topupReceiver = "500 xxx xxx";
      const topupAmount = "50";
  
      //Act
  
     
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
  