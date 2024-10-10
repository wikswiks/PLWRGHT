import { Page } from "@playwright/test";

export class PaymentsPage {
    constructor(private page: Page) {
    }
elTransferReceiver = this.page.getByTestId('transfer_receiver');
formAccountTo = this.page.getByTestId('form_account_to');
formAmount = this.page.getByTestId('form_amount');
wykonajButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
closeButton = this.page.getByTestId('close-button');

};