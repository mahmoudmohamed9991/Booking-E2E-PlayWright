// @ts-check
const { test, expect } = require("@playwright/test");
test("Booking a Double Room in Hurghada", async ({ page }) => {
  // Go To Booking Page
  await page.goto("https://booking.com/");
  // Wait for the Popup to appear
  await expect(
    page.locator('button[aria-label="Dismiss sign-in info."]')
  ).toBeVisible({ timeout: 5000 });
  // close the popUp
  await page.locator('button[aria-label="Dismiss sign-in info."]').click();
  // enter "Hurghada" in Search
  await page.getByPlaceholder("Where are you going?").type("Hurghada");
  await expect(page.getByPlaceholder("Where are you going?")).toHaveText(
    "Hurghada"
  );
  // Open Dates
  await page.locator('button[data-testid="date-display-field-start"]').click();
  // Pick Check in and Check Out Dates
  await page.locator('span[data-date="2024-07-15"]').click();
  await page.locator('span[data-date="2024-07-18"]').click();
  // Assert Dates Entered Correctly
  await expect(page.getByTestId("searchbox-dates-container")).toHaveText(
    "Mon, Jul 15 — Thu, Jul 18"
  );
  // Hit Search
  await page.locator('button[type="submit"]').click();
  // Expected the search result to match the expected
  await expect(
    page.getByRole("link", { name: "Palm Inn Suites Hotel Opens" })
  ).toBeVisible();
  // Open the first Result
  await page.getByRole("link", { name: "Palm Inn Suites Hotel Opens" }).click();
});
