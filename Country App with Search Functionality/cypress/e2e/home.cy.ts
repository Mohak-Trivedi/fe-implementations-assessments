describe("Country App Tests", () => {
  describe("UI Elements", () => {
    // Test for the Presence of the Search Input Field
    it("should have an input field for searching", () => {
      cy.visit("/");
      cy.get('input[type="text"]').should("exist");
    });
  });

  describe("API Calls", () => {
    // Test API Call for Success
    it("should call API and handle success", () => {
      cy.intercept("GET", "https://restcountries.com/v3.1/all").as(
        "getCountries"
      );
      cy.visit("/");
      cy.wait("@getCountries").its("response.statusCode").should("eq", 200);
    });

    // Test API Call for Error Handling
    it("should handle API call error", () => {
      cy.intercept("GET", "https://restcountries.com/v3.1/all", {
        statusCode: 500,
        body: "Internal Server Error",
      }).as("getCountriesError");
      cy.visit("/");
      cy.wait("@getCountriesError");
      // Add assertions for error handling UI if applicable
    });
  });

describe("API Error Handling", () => {
  it("logs an error to the console on API failure", () => {
    // Spy on both console.log and console.error
    cy.on("window:before:load", (win) => {
      cy.spy(win.console, "log").as("consoleLog");
      cy.spy(win.console, "error").as("consoleError");
    });

    // Intercept the API request and force a network error
    cy.intercept("GET", "https://restcountries.com/v3.1/all", {
      forceNetworkError: true,
    }).as("getFailedCountries");

    // Visit the application
    cy.visit("/");

    // Wait for the intercepted API call
    cy.wait("@getFailedCountries");

    // Wait for any asynchronous operations to complete
    cy.wait(500);

    // Check if either console.log or console.error was called
    cy.get("@consoleLog").then((consoleLog) => {
      cy.get("@consoleError").then((consoleError) => {
        expect(consoleLog.called || consoleError.called).to.be.true;
      });
    });
  });
});



  describe("Display of Country Containers", () => {
    // Test for the Presence of Country Containers
    it("should have containers with country flag and name", () => {
      cy.visit("/");
      cy.wait(500); // Adjust based on response time
      cy.get('div[style*="flex-direction: column"]').each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find("h2, p, span, div").should("exist");
      });
    });
  });

  describe("Search Functionality", () => {
    // Test Search Functionality and Clearing Search
    it("should filter countries based on search and show results accordingly", () => {
      cy.visit("/");
      const searchTerm = "Canada";
      cy.get('input[type="text"]').type(searchTerm);
      cy.get('div[style*="flex-direction: column"]').should(
        "contain",
        searchTerm
      );

      cy.get('input[type="text"]').clear();
      cy.get('div[style*="flex-direction: column"]').should(
        "have.length.at.least",
        249
      );
    });

    // Test for No Results on Search
    it("should show no results when no matching countries are found", () => {
      cy.visit("/");
      cy.get('input[type="text"]').type("xyz123");
      cy.get('div[style*="flex-direction: column"]').should("have.length", 0);
      // Implement additional UI checks for "no results" state if needed
    });

    // Test for Specific Search Result
    it('should show 3 containers when searching for "ind"', () => {
      cy.visit("/");
      cy.get('input[type="text"]').type("ind");
      cy.get('div[style*="flex-direction: column"]').should("have.length", 3);
    });
  });
});
