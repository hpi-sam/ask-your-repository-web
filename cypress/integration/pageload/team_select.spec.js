context('TeamSelect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('redirects to select-team', () => {
    cy.url().should('eq', 'http://localhost:3000/select-team');
  });
});
