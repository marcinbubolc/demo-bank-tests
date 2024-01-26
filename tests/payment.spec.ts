import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const paymentPage = new PaymentPage(page);


    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await paymentPage.sideMenu.goToPaymentPage.click();
  });

  test('simple payment', async ({ page }) => {
    const paymentPage = new PaymentPage(page);
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    // Act
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.makeTransferButton.click();
    await paymentPage.closeButton.click();

    // Assert
    await expect(paymentPage.expectedMessageField).toHaveText(expectedMessage);
  });
});
