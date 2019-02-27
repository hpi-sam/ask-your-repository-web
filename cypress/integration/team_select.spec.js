context('Team Select', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.authenticate();
    cy.visit('/');
  });

  it('redirects to select-team', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/select-team`);
  });

  it('creates a team', () => {
    cy.get('[data-cy=team-select-create-button]').click();
    cy.get('[data-cy=team-select-form] input[type=text]').type('My New Team');
    cy.get('[data-cy=team-select-form] [data-cy=save-button]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/images`);
  });
});
