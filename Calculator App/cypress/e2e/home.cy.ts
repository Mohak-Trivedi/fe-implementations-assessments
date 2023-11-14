describe('React Calculator Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Replace with your application's URL
  });

  describe('Rendering and Layout', () => {
    it('renders calculator display and at least 16 buttons', () => {
      cy.get('input[type="text"]').should('be.visible');
      cy.get('button, input[type="button"]').should('have.length.at.least', 16);
    });
  });

  describe('Button Interactions', () => {
    it('updates display on button click', () => {
      ['1', '2', '+', '3'].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get('input[type="text"]').should('have.value', '12+3');
    });
  });

  describe('Calculation Accuracy', () => {
    const operations = [
      { expression: ['2', '+', '3'], expectedResult: '5' },
      { expression: ['5', '-', '2'], expectedResult: '3' },
      { expression: ['4', '*', '5'], expectedResult: '20' },
      { expression: ['8', '/', '2'], expectedResult: '4' }
    ];

    operations.forEach((op) => {
      it(`correctly calculates ${op.expression.join(' ')}`, () => {
        op.expression.forEach((value) => {
          cy.get('button, input[type="button"]').contains(value).click();
        });
        cy.get('button, input[type="button"]').contains('=').click();
        cy.get('body').should('contain', op.expectedResult);
      });
    });

    it('follows BODMAS rules in calculations', () => {
      ['2', '+', '3', '*', '4', '-', '5', '/', '1', '='].forEach((value) => {
        cy.get('button, input[type="button"]').contains(value).click();
      });
      cy.get('body').should('contain', '9');
    });
  });

  describe('Clear Functionality', () => {
  it('clears input and result', () => {
    // Enter a number, perform a calculation, and then clear it
    cy.get('button , input[type="button"]').contains('2').click();
    cy.get('button , input[type="button"]').contains('+').click();
    cy.get('button , input[type="button"]').contains('2').click();
    cy.get('button , input[type="button"]').contains('=').click();
    cy.get('button , input[type="button"]').contains('C').click();

    // Check that the input field is cleared
    cy.get('input[type="text"]').should('have.value', '');

    // Check that the result display is cleared
    // Assuming the result is shown in the next div after the input
    cy.get('input[type="text"]').next('div').should('have.text', '');
  });
});

  describe('Output Display', () => {
    it('shows calculation result on the web page', () => {
      cy.get('button, input[type="button"]').contains('2').click();
      cy.get('button, input[type="button"]').contains('+').click();
      cy.get('button, input[type="button"]').contains('2').click();
      cy.get('button, input[type="button"]').contains('=').click();
      cy.get('div, span, h1, h2, h3, h4, h5, h6, p').contains('4').should('be.visible');
    });
  });
});
