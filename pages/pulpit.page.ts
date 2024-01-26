import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiverField = this.page.locator('#widget_1_transfer_receiver');
  transferAmountField = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  makeTransferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeButton = this.page.getByTestId('close-button');
  topUpReceiverField = this.page.locator('#widget_1_topup_receiver');
  topUpAmountField = this.page.locator('#widget_1_topup_amount');
  topUpAgreementField = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topUpConfirmButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
  moneyValueField = this.page.locator('#money_value');

  expectedMessageField = this.page.locator('#show_messages');
}
