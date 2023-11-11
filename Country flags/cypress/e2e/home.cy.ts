describe('Countries App', () => {

  describe('Loading and Initial Display', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('makes an API call and displays initial content', () => {
      cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries');
      cy.wait('@getCountries').its('response.statusCode').should('eq', 200);

      // Check if the app has some content after loading
      cy.get('body').should('not.be.empty');
    });
  });

  describe('Flag Display', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('displays country flags with alt text', () => {
      cy.get('img').should('have.length.at.least', 250)
        .and(($imgs) => {
          expect($imgs).to.have.attr('alt').and.not.be.empty;
        });
    });
  });

  describe('Country Name Display', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('displays country names', () => {
      // Check for elements likely to contain country names
      // Ensures these elements are not empty and contain some text
      cy.get('div, span, h1, h2, h3, h4, h5, h6, p')
        .filter((index, element) => {
          return element.innerText.trim().length > 0;
        })
        .should('have.length.at.least', 1);
    });
  });

  describe('Error Handling', () => {
    it('handles API failure gracefully', () => {
      cy.intercept('GET', 'https://restcountries.com/v3.1/all', {
        forceNetworkError: true
      }).as('getFailedCountries');

      cy.visit('/');

      // Check for application's error handling
      // Example:
      // cy.get('.error-message').should('be.visible').and('contain', 'Error fetching data');
    });
  });

});
