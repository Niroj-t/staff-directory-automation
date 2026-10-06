import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-username').fill('admin.anil');
    await page.getByTestId('login-password').fill('Admin@123');
    await page.getByRole('button').click();
    await expect(page.getByTestId('employee-row')).toHaveCount(12);
  });

  // Prediction: Only one staff name contains "Aarati", so the list drops from 12 rows to 1 row, and that row is Aarati Karki.
  test("searching by a staff's name narrows the list", async ({ page }) => {
    await page.getByTestId('filter-search').fill('Aarati');
    await expect(page.getByTestId('employee-row')).toHaveCount(1);
    await expect(page.getByTestId('employee-row').filter({ hasText: 'Aarati Karki' })).toBeVisible();
  });

  // Prediction: Search also checks designation. 
  // Two staff have "Developer" in their designation (Backend Developer, Frontend Developer),
  //  so2 rows remain: Bibek Thapa and Dipesh Gurung.
  test('searching by a designation narrows the list', async ({ page }) => {
    await page.getByTestId('filter-search').fill('Developer');
    await expect(page.getByTestId('employee-row')).toHaveCount(2);
    await expect(page.getByTestId('employee-row').filter({ hasText: 'Bibek Thapa' })).toBeVisible();
    await expect(page.getByTestId('employee-row').filter({ hasText: 'Dipesh Gurung' })).toBeVisible();
  });

  // Prediction: Nothing matches "Avengers", so the table disappears,
  // 0 rows are shown, and the text "No staff match your filters." appears.
  test('searching for something that does not exist shows the empty state', async ({ page }) => {
    await page.getByTestId('filter-search').fill('Avengers');
    await expect(page.getByText('No staff match your filters.')).toBeVisible();
    await expect(page.getByTestId('employee-row')).toHaveCount(0);
  });

  // Prediction: After searching "Developer" the count text updates from
  // "Showing 12 of 12 staff" to "Showing 2 of 12 staff". The total (12) stays the same; only the shown number changes.
  test('the count text reflects how many staff are shown after a search', async ({ page }) => {
    await page.getByTestId('filter-search').fill('Developer');
    await expect(page.getByTestId('employee-count')).toHaveText('Showing 2 of 12 staff');
  });
});