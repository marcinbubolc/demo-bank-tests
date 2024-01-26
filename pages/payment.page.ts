import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.getByTestId('transfer_receiver');
  transferAccount = this.page.getByTestId('form_account_to');
  transferAmount = this.page.getByTestId('form_amount');
  makeTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeButton = this.page.getByTestId('close-button');

  expectedMessageField = this.page.locator('#show_messages');
}
