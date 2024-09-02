import { test, expect } from "@playwright/test";

test.describe("User login to Demobankk", () => {

  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);

  })
   

  test("1. login with correct credentials", async ({ page }) => {

    //Arrange

    const userId = "kakaszek";
    const userPassword = "12345678";
    const expectedUserName = "Jan Demobankowy";

    //Act

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    //Assert

    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("2. login with incorrect credentials", async ({ page }) => {

    //Arrange

    const errorLogin = "identyfikator ma min. 8 znaków";

    //Act

    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("password-input").click();

    //Assert

    await expect(page.getByTestId("error-login-id")).toHaveText(
      errorLogin,
    );
  });

  test("3. too short password", async ({ page }) => {

    //Arrange

    const userId = "kakaszek";
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