import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/';
  const userLogin = 'testerLO';
  const userPassword = 'test1234';
  const expectedUserName = 'Jan Demobankowy';

  test('login with correct credentials', async ({ page }) => {
    // Arrange

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short login', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill('test');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
