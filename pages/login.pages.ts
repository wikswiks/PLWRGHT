import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }
    loginInput = this.page.getByTestId("login-input");
    passwordInput = this.page.getByTestId("password-input");
    loginButton = this.page.getByTestId("login-button");
    loginErrorLocator = this.page.getByTestId("error-login-id");
    incorrectPassword = this.page.getByTestId("password-input");
    errorPasswordLocator = this.page.getByTestId("error-login-password");
    userName = this.page.getByTestId("user-name");
};

