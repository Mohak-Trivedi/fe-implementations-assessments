describe("Initial Page Load Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("checks initial rendering of the page", () => {
    cy.contains("Full Name Display").should("exist");

    cy.get('input[type="text"]').first().should("have.value", "");
    cy.get('input[type="text"]').last().should("have.value", "");

    cy.get('button[type="submit"]').should("exist");
  });
});

describe("Input Field Functionality Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("tests input fields functionality", () => {
    cy.get('input[type="text"]')
      .first()
      .type("John")
      .should("have.value", "John");
    cy.get('input[type="text"]').last().type("Doe").should("have.value", "Doe");
  });
});

describe("Form Submission Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("submits the form and displays the full name", () => {
    cy.get('input[type="text"]').first().type("John");
    cy.get('input[type="text"]').last().type("Doe");
    cy.get('button[type="submit"]').click();
    cy.get("form").next().should("contain", "Full Name: John Doe");
  });

  it("checks if the form submission does not reload the page", () => {
    const firstName = "John";
    const lastName = "Doe";

    cy.get('input[type="text"]').first().type(firstName);
    cy.get('input[type="text"]').last().type(lastName);

    cy.get('button[type="submit"]').click();

    // Check if the input fields still have the values after submission
    cy.get('input[type="text"]').first().should("have.value", firstName);
    cy.get('input[type="text"]').last().should("have.value", lastName);
  });
});

describe("Edge Case Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("submits the form with one field empty and does not display a full name", () => {
    cy.get('input[type="text"]').first().type("John");
    cy.get('button[type="submit"]').click();
    cy.get("form").next().should("not.exist");
  });

  it("submits the form with both fields empty and does not display a full name", () => {
    cy.get('button[type="submit"]').click();
    cy.get("form").next().should("not.exist");
  });

  it("tests various inputs including special characters and numbers", () => {
    cy.get('input[type="text"]').first().type("Jane123");
    cy.get('input[type="text"]').last().type("Doe!");
    cy.get('button[type="submit"]').click();
    cy.get("form").next().should("contain", "Full Name: Jane123 Doe!");
  });
});
