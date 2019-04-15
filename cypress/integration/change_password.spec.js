import humps from 'humps';

context('Change Password', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.authenticate().then((auth) => {
      cy.server();
      cy.route({ method: 'PATCH', url: `users/${auth.user.id}` }).as('changePassword');
      cy.visit('/settings');
    });
  });

  it('enables to login with the new password', () => {
    cy.get('[data-cy=change-password-old-password-input]').type('secret');
    cy.get('[data-cy=change-password-new-password-input]').type('newSecret');
    cy.get('[data-cy=change-password-new-password-confirm-input]').type('newSecret');
    cy.get('[data-cy=change-password-submit-button]').click();
    cy.wait('@changePassword');

    const loginData = { emailOrUsername: 'jenny', password: 'newSecret' };
    const options = {
      method: 'POST',
      url: `${Cypress.env('API_URL')}/authentications`,
      body: humps.decamelizeKeys(loginData),
    };

    cy.request(options).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
