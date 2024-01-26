import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}

  goToPaymentPage = this.page.getByRole('link', { name: 'płatności' });
}
