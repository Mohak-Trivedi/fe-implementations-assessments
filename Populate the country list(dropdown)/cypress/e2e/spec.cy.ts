describe('CitySelector Component Tests', () => {
  beforeEach(() => {
    // This will run before each test in every describe block
    cy.visit('http://localhost:3000/'); // Adjust to the correct URL
  });

  describe('Initial Render and Dropdown Presence Tests', () => {
    it('renders all dropdowns correctly', () => {
      cy.get('select').should('have.length', 3);
    });
  });

  describe('Dropdown Population Tests', () => {
    it('populates country dropdown with data from API', () => {
      cy.get('select').first().children('option').should('have.length.greaterThan', 283);
    });

    it('populates state dropdown when a country (India) is selected', () => {
      cy.get('select').first().select('India');
      cy.get('select').eq(1).children('option').should('have.length.greaterThan', 35);
    });

    it('populates city dropdown when a state (Goa) is selected', () => {
      cy.get('select').first().select('India');
      cy.get('select').eq(1).select('Goa');
      cy.get('select').eq(2).children('option').should('have.length.greaterThan', 11);
    });
  });

  describe('Location Selection and Display Tests', () => {
    it('displays the selected location correctly', () => {
      cy.get('select').first().select('India');
      cy.get('select').eq(1).select('Goa');
      cy.get('select').last().select('Panaji');
      cy.get('div, span, h1, h2, h3, h4, h5, h6, p')
        .contains('You selected Panaji, Goa, India')
        .should('exist');
    });
  });

  describe('API Error Handling Tests', () => {
    // it('handles country API error gracefully', () => {
    //   cy.intercept('GET', 'https://crio-location-selector.onrender.com/countries', {
    //     statusCode: 500
    //   }).as('getCountriesError');
    //   cy.wait('@getCountriesError');
    //   cy.get('select').eq(0).children().should('have.length', 1); 
    // });
    it('handles country API error gracefully', () => {
      // Intercept the API call for countries and simulate a server error
      cy.intercept('GET', 'https://crio-location-selector.onrender.com/countries', {
        statusCode: 500
      }).as('getCountriesError');
  
      // Visit the page after setting up the intercept
      cy.visit('http://localhost:3000/'); // Adjust to the correct URL
  
      // Wait for the intercepted API call
      cy.wait('@getCountriesError').its('response.statusCode').should('eq', 500);
  
      // Check if the country dropdown does not populate with new options
      cy.get('select').first().children('option').should('have.length', 1); 
    });
    it('handles state API error gracefully when India is selected', () => {
      cy.intercept('GET', 'https://crio-location-selector.onrender.com/country=India/states', {
        statusCode: 500
      }).as('getStatesError');
      cy.get('select').first().select('India');
      cy.wait('@getStatesError').its('response.statusCode').should('eq', 500);
      cy.get('select').eq(1).children('option').should('have.length', 1);
    });
  });
});
