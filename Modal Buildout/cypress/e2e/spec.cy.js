describe("User Details Modal", () => {
  beforeEach(() => {
    // Visit your app's URL or page here
    cy.visit("http://localhost:3000");
  });

  describe("Opening and Closing Modal", () => {
    it("should open the modal when the 'Open Modal' button is clicked", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Assert that the modal is visible
      cy.get(".modal").should("be.visible");
    });

    it("should close the modal when the 'Submit' button is clicked", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Click the 'Submit' button
      cy.get('form').submit();

      // Assert that the modal is not visible
      cy.contains('Fill Details').should("not.exist");
    });
  });

  describe("Modal Title", () => {
    it("should display 'User Details' as the modal title", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Assert that the modal title is 'User Details'
      cy.get("h1,h2,h3,h4,h5,h6,p,div,span").should("contain", "Fill Details");
    });
  });

  describe("Form Validation", () => {
    it("should validate and require the 'Username' field", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Click the 'Submit' button without entering the 'Username'
      cy.contains("Submit").click();

      // Assert that the 'Username' input has a validation error
      cy.get('input[name="username"]').should("have.attr", "required");
    });

    it("should validate and require the 'Email Address' field", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Click the 'Submit' button without entering the 'Email Address'
      cy.contains("Submit").click();

      // Assert that the 'Email Address' input has a validation error
      cy.get('input[name="email"]').should("have.attr", "required");
    });

    it("should validate and require the 'Phone Number' field", () => {
      // Click the 'Open Modal' button
      cy.contains("Open Form").click();

      // Click the 'Submit' button without entering the 'Phone Number'
      cy.contains("Submit").click();

      // Assert that the 'Phone Number' input has a validation error
      cy.get('input[name="phone"]').should("have.attr", "required");
    });
  });
});
