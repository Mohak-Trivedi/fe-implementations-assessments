describe("React Calculator Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with your application's URL
  });

  describe("Rendering and Layout", () => {
    it("renders calculator display and at least 16 buttons", () => {
      cy.get('input[type="text"]').should("be.visible");
      cy.get('button, input[type="button"]').should("have.length.at.least", 16);
    });
  });

  describe("Button Interactions", () => {
    it("updates display on button click", () => {
      ["1", "2", "+", "3"].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get('input[type="text"]').should("have.value", "12+3");
    });
  });

  describe("Calculation Accuracy", () => {
    const operations = [
      { expression: ["2", "+", "3"], expectedResult: "5" },
      { expression: ["5", "-", "2"], expectedResult: "3" },
      { expression: ["4", "*", "5"], expectedResult: "20" },
      { expression: ["8", "/", "2"], expectedResult: "4" },
    ];

    operations.forEach((op) => {
      it(`correctly calculates ${op.expression.join(" ")}`, () => {
        op.expression.forEach((value) => {
          cy.get('button, input[type="button"]').contains(value).click();
        });
        cy.get('button, input[type="button"]').contains("=").click();
        cy.get("body").should("contain", op.expectedResult);
      });
    });

    it("follows BODMAS rules in calculations", () => {
      ["2", "+", "3", "*", "4", "-", "5", "/", "1", "="].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get("body").should("contain", "9");
    });
  });

  describe("Edge Case Handling", () => {
    it("handles division by zero", () => {
      ["1", "/", "0", "="].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get("div").should("contain", "Infinity"); // Adjust based on calculator's handling of division by zero
    });
    // Handles 0/0
    it("handles division zero by zero", () => {
      ["0", "/", "0", "="].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get("div").should("contain", "NaN"); // Adjust based on calculator's handling of division by zero
    });

    it('handles incomplete expression (e.g., pressing "=" without complete expression)', () => {
      cy.get('button, input[type="button"]').contains("=").click();
      cy.get("div").should("contain", "Error"); // Assuming calculator does not show an error for incomplete expression
    });
  });

  describe("Clear Functionality", () => {
    it("clears input and result", () => {
      ["2", "+", "2", "=", "C"].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get('input[type="text"]').should("have.value", "");
      cy.get("div").contains("Error").should("not.exist");
    });
  });

  describe("Output Display", () => {
    it("shows calculation result on the web page", () => {
      ["2", "+", "2", "="].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get("div").contains("4").should("be.visible");
    });
  });
});
