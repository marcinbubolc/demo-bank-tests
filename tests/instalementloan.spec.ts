import { test, expect } from '@playwright/test';

test.describe('Instalement loan pop-up', () => {

    test.only('Check instalement pop-up', async ({ page }) => {
        // Arrange
        const url = 'https://demo-bank.vercel.app/'
        const userLogin = 'testerLO';
        const userPassword = 'test1234';
        const expectedUserName = 'Jan Demobankowy';

        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userLogin);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('span').filter({ hasText: 'kredyt ratalny' }).click();
        await page.getByRole('article').filter({ hasText: 'kredyt ratalny pozostało do spłaty pozostało do spłaty 13 070 ,83 PLN więcej dat' }).locator('a').click();
        await page.locator('i').filter({ hasText: 'na ten rachunek wpłacaj kwoty rat zgodnie z harmonogramem' });
        // await page.getByText('data najbliższej raty').click();
        // await page.getByText('28.04.2014').click();
        // await page.getByText('kwota najbliższej raty').click();
        // await page.getByText('350').click();

        // Assert
        await expect(page.locator('#ui-tooltip-22')).toHaveText('na ten rachunek wpłacaj kwoty rat zgodnie z harmonogramem');
        // await expect(page.frameLocator('.ui-tooltip-content')).toContain('na ten rachunek wpłacaj kwoty rat zgodnie z harmonogramem');
    });
});
