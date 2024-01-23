import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // Arrange
  const userLogin = 'testerLO';
  const userPassword = 'test1234';
  const expectedUserName = 'Jan Demobankowy';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('login with correct credentials', async ({ page }) => {
    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short login', async ({ page }) => {
    //Arrange
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    const incorrectUsername = 'tester';

    //Act
    await page.getByTestId('login-input').fill(incorrectUsername);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    const incorrectPassword = 'test';

    //Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
