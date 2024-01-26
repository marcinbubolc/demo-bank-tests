import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiverField = this.page.locator('#widget_1_transfer_receiver');
  transferAmountField = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  makeTransferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeButton = this.page.getByTestId('close-button');

  expectedMessageField = this.page.locator('#show_messages');
}
