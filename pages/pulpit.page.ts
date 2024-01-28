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
  loginField = this.page.getByTestId('user-name');

  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverField.selectOption(receiverId);
    await this.transferAmountField.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.makeTransferButton.click();
    await this.closeButton.click();
  }

  async topUpMethod(topUpReceiver: string, topUpAmount: string): Promise<void> {
    await this.topUpReceiverField.selectOption(topUpReceiver);
    await this.topUpAmountField.fill(topUpAmount);
    await this.topUpAgreementField.click();
    await this.topUpConfirmButton.click();
    await this.closeButton.click();
  }
}
