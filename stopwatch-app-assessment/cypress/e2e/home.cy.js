describe("Stopwatch App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.clock(); // Freeze time at the start of each test
  });

  it("verifies the initial state of the stopwatch", () => {
    cy.contains("Stopwatch").should("exist");
    cy.contains("Time: 0:00").should("exist");
    cy.contains("button", "Start").should("exist");
    cy.contains("button", "Reset").should("exist");
  });

  it("tests the start functionality of the stopwatch", () => {
    cy.contains("button", "Start").click();
    cy.contains("button", "Stop").should("exist");
    cy.tick(2000); // Advance time by 2 seconds
    cy.contains("Time:").invoke("text").should("not.eq", "Time: 0:00");
  });

  it("tests the stop functionality of the stopwatch", () => {
    cy.contains("button", "Start").click();
    cy.tick(2000); // Advance time by 2 seconds
    cy.contains("button", "Stop").click();
    cy.contains("button", "Start").should("exist");
    cy.contains("Time:")
      .invoke("text")
      .then((timeAfterStop) => {
        cy.tick(2000); // Advance time by another 2 seconds
        cy.contains("Time:").invoke("text").should("eq", timeAfterStop);
      });
  });

  it("tests the reset functionality of the stopwatch", () => {
    cy.contains("button", "Start").click();
    cy.tick(2000); // Advance time by 2 seconds
    cy.contains("button", "Reset").click();
    cy.contains("Time: 0:00").should("exist");
  });

  it("verifies continuous operation of the stopwatch", () => {
    cy.contains("button", "Start").click();
    cy.tick(1000); // Advance time by 1 second
    cy.contains("button", "Stop").click();
    cy.tick(500); // Advance time by 0.5 seconds
    cy.contains("button", "Start").click();
    cy.tick(1000); // Advance time by 1 second
    cy.contains("button", "Reset").click();
    cy.contains("Time: 0:00").should("exist");
  });

  it("verifies the time format is correct", () => {
    cy.contains("button", "Start").click();
    cy.tick(65000); // Advance time by 65 seconds
    cy.contains("Time: 1:05").should("exist");
  });

  it("tests boundary conditions around 59 seconds to 1 minute", () => {
    cy.contains("button", "Start").click();
    cy.tick(59000); // Advance time to 59 seconds
    cy.contains("Time: 0:59").should("exist");
    cy.tick(1000); // Advance time by 1 second to cross the boundary
    cy.contains("Time: 1:00").should("exist");
  });
});
