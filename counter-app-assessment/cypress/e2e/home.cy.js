describe("Counter App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // 1. Initial State Verification
  it("should display initial count as 0", () => {
    cy.contains("Count: 0");
  });

  // 2. Increment Functionality
  it("should increment count by 1 on Increment button click", () => {
    cy.get("button").contains("Increment").click();
    cy.contains("Count: 1");
  });

  // 3. Decrement Functionality
  it("should decrement count by 1 on Decrement button click", () => {
    cy.get("button").contains("Decrement").click();
    cy.contains("Count: -1");
  });

  // 4. Continuous Increment
  it("should increment count correctly on multiple Increment clicks", () => {
    const clicks = 5;
    for (let i = 0; i < clicks; i++) {
      cy.get("button").contains("Increment").click();
    }
    cy.contains(`Count: ${clicks}`);
  });

  // 5. Continuous Decrement
  it("should decrement count correctly on multiple Decrement clicks", () => {
    const clicks = 5;
    for (let i = 0; i < clicks; i++) {
      cy.get("button").contains("Decrement").click();
    }
    cy.contains(`Count: -${clicks}`);
  });

  // 6. Increment and Decrement Interplay
  it("should correctly update count with alternating Increment and Decrement clicks", () => {
    cy.get("button").contains("Increment").click();
    cy.get("button").contains("Decrement").click();
    cy.get("button").contains("Increment").click();
    cy.contains("Count: 1");
  });

  // 7. Negative Count Verification
  it("should allow count to go below 0", () => {
    cy.get("button").contains("Decrement").click();
    cy.get("button").contains("Decrement").click();
    cy.contains("Count: -2");
  });
});
