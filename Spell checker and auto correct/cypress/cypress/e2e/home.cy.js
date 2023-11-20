describe("SpellCheckApp Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); // Replace with the correct URL
  });

  describe("Initial State Tests", () => {
    it("should have an empty input area initially", () => {
      cy.get('textarea, input[type="text"]').should("have.value", "");
      cy.contains(/did you mean:/i).should("not.exist");
    });
  });

  describe("Single Word Correction Tests", () => {
    it("should suggest a correction for a misspelled word", () => {
      cy.get('textarea, input[type="text"]').type("teh");
      cy.contains(/did you mean:/i).should("exist");
      cy.contains(/did you mean:.*the/i).should("exist");
    });

    it("should not suggest any correction for correctly spelled words", () => {
      cy.get('textarea, input[type="text"]').type("the");
      cy.contains(/did you mean:/i).should("not.exist");
    });
  });

  describe("Sentence Correction Tests", () => {
    it("should suggest correction for a sentence with one misspelled word", () => {
      cy.get('textarea, input[type="text"]').type("I like to wrok");
      cy.contains(/did you mean:.*work/i).should("exist");
    });

    it("should suggest the first correction in a sentence with multiple mistakes", () => {
      cy.get('textarea, input[type="text"]').type("Teh cat likes to wrok");
      cy.contains(/did you mean:.*the/i).should("exist");
    });
  });

  describe("Case Sensitivity and Continuous Typing Tests", () => {
    it("should correctly suggest corrections regardless of case", () => {
      cy.get('textarea, input[type="text"]').type("TEH");
      cy.contains(/did you mean:.*the/i).should("exist");
    });

    it("should not update suggestions for subsequent misspelled words during continuous typing", () => {
      cy.get('textarea, input[type="text"]').type("I will wrok teh");
      cy.contains(/did you mean:.*work/i).should("exist");
      // No check for "the" as the application doesn't update suggestions for subsequent words
    });
  });

  describe("Editing and Deletion Tests", () => {
    it("should remove or update suggestions when text is edited", () => {
      cy.get('textarea, input[type="text"]').type("teh cat");
      cy.contains(/did you mean:.*the/i).should("exist");
      cy.get('textarea, input[type="text"]').clear().type("the cat");
      cy.contains(/did you mean:/i).should("not.exist");
    });
  });
});
