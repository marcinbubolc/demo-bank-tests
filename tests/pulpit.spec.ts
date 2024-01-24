import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // Arrange
  const receiverId = '2';
  const transferAmount = '150';
  const transferTitle = 'pizza';
  const expectedTransferReceiver = 'Chuck Demobankowy';
  const topUpPhone = '502 xxx xxx';
  const topupAmount = '50';

  test.beforeEach(async ({ page }) => {
    const userLogin = 'testerLO';
    const userPassword = 'test1234';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('Quick payment with correct data', async ({ page }) => {
    // Act
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
    await page.locator('#widget_1_topup_receiver').selectOption(topUpPhone);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement').click();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
