import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

  test('Quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/'
    const userLogin = 'testerLO';
    const userPassword = 'test1234';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy'

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    // Assert
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
  });

  test('Successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').fill('login123');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement').click();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 502 xxx xxx');
  });
});