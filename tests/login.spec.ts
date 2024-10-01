import { test, expect } from "@playwright/test";
import { loginData } from "../test.data/test.data";
import { LoginPage } from "../pages/login.pages";

test.describe("User login to Demobankk", () => {

  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);

  })


  test("1. login with correct credentials", async ({ page }) => {

    //Arrange

    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = "Jan Demobankowy";
    const loginPage = new LoginPage(page);

    //Act

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //await page.getByTestId("login-input").fill(userId);
    //await page.getByTestId("password-input").fill(userPassword);
    //await page.getByTestId("login-button").click();

    //Assert

    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("2. login with incorrect credentials", async ({ page }) => {

    //Arrange
    
    const incorrectUserId = "test";
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";
    
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();
   
    //await page.getByTestId("login-input").fill(incorrectUserId);
    //await page.getByTestId("password-input").click();

    //Assert

    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test("3. too short password", async ({ page }) => {

    //Arrange

    const userId = loginData.userId;
    const errorPassword = "hasło ma min. 8 znaków";

    //Act

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill("Kak");
    await page.getByTestId("password-input").blur(); //blur - jakiekilwiek miejsce na stronie, zeby out of focus

    //Assert

    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorPassword,
    );
  });
});