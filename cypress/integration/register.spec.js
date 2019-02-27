context('Register', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.server();
    cy.route({ method: 'POST', url: '/users' }).as('createUser');
    cy.visit('/register');
  });

  it('creates a user with the given credentials', () => {
    cy.get('[data-cy=register-username-input]').type('jenny');
    cy.get('[data-cy=register-email-input]').type('jenny@example.com');
    cy.get('[data-cy=register-password-input]').type('secret');
    cy.get('[data-cy=register-password-repeat-input]').type('secret');
    cy.get('[data-cy=register-submit-button]').click();

    cy.wait('@createUser')
      .its('response.body')
      .should((user) => {
        expect(user).to.have.property('username', 'jenny');
        expect(user).to.have.property('email', 'jenny@example.com');
      });
  });
});
