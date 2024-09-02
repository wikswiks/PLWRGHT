import { test, expect } from "@playwright/test";

test.describe("Blog and Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://applover.com/";
    await page.goto(url);
  });

  test.only("Check blog flow and then contact form", async ({ page, context }) => {

    //Arrange

    const newPagePromise = context.waitForEvent('page'); // "Promise" about new page will be open
    
    //Act
    
    await page.getByRole('link', { name: 'First in-depth interview?' }).click(); // Go to blog section
    await page.getByRole('link', { name: 'Mobile App Development' }).click(); // Choose a topic
    await page.getByRole('link', { name: 'SLA – what is it, and why do you need it?', exact: true }).click(); // Choose a particular article
    await page.getByRole('link', { name: 'LET\'S HAVE A CHAT!' }).click() // Click on the link that opens the contact form
    const newPage = await newPagePromise; // "Promise" check
    
    //Assert

    await expect(newPage.locator('#contact-form')).toBeVisible(); // Assert that the contact form is visible
});
});
 