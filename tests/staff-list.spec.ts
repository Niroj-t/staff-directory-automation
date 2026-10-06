import { test, expect } from '@playwright/test';

test("after signing in, the correct number of staffs is shown", async ({ page }) => {
  // Prediction: after signing in, the correct number of staffs is shown.
  await page.goto("/login");
  await page.getByTestId("login-username").fill("admin.anil");
  await page.getByTestId("login-password").fill("Admin@123");
  await page.getByTestId("login-submit").click();

  // Assertions
  await expect(page.getByTestId('employee-row')).toHaveCount(12);
  await expect(page.getByTestId('employee-count')).toHaveText('Showing 12 of 12 staff');

});