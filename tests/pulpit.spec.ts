import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // Arrange
  const url = 'https://demo-bank.vercel.app/';
  const userLogin = 'testerLO';
  const userPassword = 'test1234';
  const receiverId = '2';
  const transferAmount = '150';
  const transferTitle = 'pizza';
  const expectedTransferReceiver = 'Chuck Demobankowy';
  const topUpPhone = '502 xxx xxx';
  const topupAmount = '50';

  test('Quick payment with correct data', async ({ page }) => {
    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    
    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('Successful mobile top-up', async ({ page }) => {
    // Arrange
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topUpPhone}`;

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(topUpPhone);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedMessage,
    );
  });
});
