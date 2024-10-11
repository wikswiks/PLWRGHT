import { Page } from "@playwright/test";

export class PulpitePage {
  
    constructor(private page: Page) {}
    elChooseReceiver = this.page.locator("#widget_1_transfer_receiver");
    elTransferAmount = this.page.locator("#widget_1_transfer_amount");
    elTransferTitle = this.page.locator("#widget_1_transfer_title");
    wykonajButton = this.page.getByRole("button", { name: "wykonaj" });
    closeButton = this.page.getByTestId("close-button");
    messageText = this.page.getByTestId("message-text");
};



