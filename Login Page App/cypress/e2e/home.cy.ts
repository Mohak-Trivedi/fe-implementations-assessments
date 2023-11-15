describe("LoginPage Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Initial Render", () => {
    it("should render the login form with empty username and password fields", () => {
      cy.contains("label", "Username").next("input").should("have.value", "");
      cy.contains("label", "Password").next("input").should("have.value", "");
    });

    it("should have a submit button", () => {
      cy.get(
        'button, button[type="submit"], input[type="submit"], input[type="button"]'
      ).should("exist");
    });
  });

  describe("Input Field Behavior", () => {
    it("should update the username field on typing", () => {
      cy.contains("label", "Username")
        .next("input")
        .type("testuser")
        .should("have.value", "testuser");
    });

    it("should update the password field on typing", () => {
      cy.contains("label", "Password")
        .next("input")
        .type("testpass")
        .should("have.value", "testpass");
    });
  });

  describe("Form Submission with Empty Fields", () => {
    it("should not submit the form with an empty username", () => {
      cy.contains("label", "Password").next("input").type("password");
      cy.get(
        'button, button[type="submit"], input[type="submit"], input[type="button"]'
      ).click();
      cy.contains("Welcome,").should("not.exist");
      cy.get("form").should("exist");
    });

    it("should not submit the form with an empty password", () => {
      cy.contains("label", "Username").next("input").type("user");
      cy.get(
        'button, button[type="submit"], input[type="submit"], input[type="button"]'
      ).click();
      cy.contains("Welcome,").should("not.exist");
      cy.get("form").should("exist");
    });
  });

  describe("Form Submission with Invalid and Valid Credentials", () => {
    it("should show an error message for invalid credentials", () => {
      cy.contains("label", "Username").next("input").type("wronguser");
      cy.contains("label", "Password").next("input").type("wrongpass");
      cy.get(
        'button, button[type="submit"], input[type="submit"], input[type="button"]'
      ).click();
      cy.contains("Invalid username or password").should("exist");
    });

    it("should allow user to log in with correct credentials", () => {
      cy.contains("label", "Username").next("input").type("user");
      cy.contains("label", "Password").next("input").type("password");
      cy.get(
        'button, button[type="submit"], input[type="submit"], input[type="button"]'
      ).click();
      cy.contains(
        "p, div, span, h1, h2, h3, h4, h5, h6",
        "Welcome, user"
      ).should("exist");
    });
  });

  // You can add additional tests for edge cases as needed.
});
