import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    await loginPage.login(userId, userPassword);
  });
  
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    
    // Act
    await pulpitPage.transferReceiverField.selectOption(receiverId);
    await pulpitPage.transferAmountField.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.makeTransferButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.expectedMessageField).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
    
    // Act
    await pulpitPage.topUpReceiverField.selectOption(topUpReceiver);
    await pulpitPage.topUpAmountField.fill(topUpAmount);
    await pulpitPage.topUpAgreementField.click();
    await pulpitPage.topUpConfirmButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.expectedMessageField).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueField.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    
    // Act
    await pulpitPage.topUpReceiverField.selectOption(topUpReceiver);
    await pulpitPage.topUpAmountField.fill(topUpAmount);
    await pulpitPage.topUpAgreementField.click();
    await pulpitPage.topUpConfirmButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValueField).toHaveText(`${expectedBalance}`);
  });
});
