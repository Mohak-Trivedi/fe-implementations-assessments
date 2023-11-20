describe("Dictionary App Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Adjust the URL as needed
  });

  it("Initial Render Tests", () => {
    cy.contains("Dictionary App").should("be.visible");
    cy.get('input[type="text"]').should("be.visible");
    cy.get("button").should("be.visible");
    cy.get('input[type="text"]').should("have.value", "");
  });

  it("Input Field Tests", () => {
    const searchText = "React";
    cy.get('input[type="text"]')
      .type(searchText)
      .should("have.value", searchText);
  });

  it("Search Functionality Tests", () => {
    // Test with a word that exists in the dictionary
    cy.get('input[type="text"]').type("React");
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "A JavaScript library for building user interfaces.");

    // Test with a word that doesn't exist in the dictionary
    cy.get('input[type="text"]').clear().type("NonExistentWord");
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "Word not found in the dictionary.");

    // Test case-insensitive search functionality
    cy.get('input[type="text"]').clear().type("reACT");
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "A JavaScript library for building user interfaces.");
  });

  it("Button Functionality Tests", () => {
    // Verify that clicking the search button triggers the search operation
    cy.get('input[type="text"]').type("React");
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "A JavaScript library for building user interfaces.");

    // Test searching without pressing "Enter" in the input field
    cy.get('input[type="text"]').clear().type("Component");
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "A reusable building block in React.");
  });

  it("No Search Term Tests", () => {
    // Test the behavior when the search button is clicked without entering any search term
    cy.get("button").click();
    cy.contains("Definition:")
      .next()
      .should("contain", "Word not found in the dictionary.");
  });

  it("User Interface Tests", () => {
    // Check for the presence of all UI elements
    cy.get('input[type="text"]').should("be.visible");
    cy.get("button").should("be.visible");
    cy.contains("Definition:").should("be.visible");
    cy.get('input[type="text"]').type("React");
    cy.get("button").click();

    // Test if the UI layout remains consistent during different operations
    cy.get('input[type="text"]').should("be.visible");
    cy.get("button").should("be.visible");
    cy.contains("Definition:").should("be.visible");
  });
});
