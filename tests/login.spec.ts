import { test, expect } from "@playwright/test";

test("login page has the correct title", async ({ page }) => {
  // Prediction: tab title is Qrius Staff Directory and Sign In text is visible.
  await page.goto("/login");
  await expect(page).toHaveTitle("Qrius Staff Directory");
});

test("admin can sign in and reaches the admin browser", async ({ browser }) => {
  // Prediction: URL becomes /admin, and the role is Admin.
  const adminContext = await browser.newContext();
  const page = await adminContext.newPage();
  await page.goto("/login");
  await page.getByTestId("login-username").fill("admin.anil");
  await page.getByTestId("login-password").fill("Admin@123");
  await page.getByTestId("login-submit").click();

  // Assertions
  await expect(page).toHaveURL(/\/employees/);
  await expect(page.getByTestId("nav-role")).toHaveText("ADMIN");

  await adminContext.close();
});

test("hr can sign in and reaches the hr browser", async ({ browser }) => {
  // Prediction: URL becomes /hr, and the role is HR.
  const hrContext = await browser.newContext();
  const page = await hrContext.newPage();
  await page.goto("/login");
  await page.getByTestId("login-username").fill("hr.sita");
  await page.getByTestId("login-password").fill("Hr@123");
  await page.getByTestId("login-submit").click();

  // Assertions
  await expect(page).toHaveURL(/\/employees/);
  await expect(page.getByTestId("nav-role")).toHaveText("HR");

  await hrContext.close();
});

test("employee can sign in and reaches the employee browser", async ({
  browser,
}) => {
  // Prediction: URL becomes /employee, and the role is Employee.
  const employeeContext = await browser.newContext();
  const page = await employeeContext.newPage();
  await page.goto("/login");
  await page.getByTestId("login-username").fill("emp.ram");
  await page.getByTestId("login-password").fill("Emp@123");
  await page.getByTestId("login-submit").click();

  // Assertions
  await expect(page).toHaveURL(/\/employees/);
  await expect(page.getByTestId("nav-role")).toHaveText("EMPLOYEE");

  await employeeContext.close();
});

test("wrong password shows an error and stays on the login page", async ({
  page,
}) => {
  // Prediction: URL remains /login, and an error message is displayed.
  await page.goto("/login");

  await page.getByTestId("login-username").fill("admin.anil");
  await page.getByTestId("login-password").fill("WrongPassword");
  await page.getByTestId("login-submit").click();

  // Assertions
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole("alert")).toBeVisible();
});
