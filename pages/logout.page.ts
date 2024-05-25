import { Page, expect } from '@playwright/test';

export class LogoutPage {
  constructor(private page: Page) {}

  logoutButton = this.page.getByTestId('logout-button');
  mainPageHeader = this.page.locator("//h1[@id='header_2']");
  loginButton = this.page.getByTestId('login-button');

  async logout(): Promise <void> {
    await this.logoutButton.click();
    await expect(this.mainPageHeader).toHaveText("Wersja demonstracyjna serwisu Demobank");
    await expect(this.loginButton).toHaveText("zaloguj się");
    console.log("Logout successful...");
  }
}