context('Upload', () => {
  let activeTeam;

  beforeEach(() => {
    cy.setActiveTeam()
      .then((team) => {
        activeTeam = team;
      });
    cy.visit('/upload');
  });

  context('uploading an image', () => {
    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.get('[data-cy=upload-dropzone]').upload('goat.jpg');
    });

    it('redirects to tagging', () => {
      cy.wait('@uploadImage');
      cy.url().should('eq', `${Cypress.config().baseUrl}/tagging`);
    });

    it('creates the image for the correct team', () => {
      cy.wait('@uploadImage')
        .its('response.body.team_id')
        .should('be.eq', activeTeam.id);
    });
  });
});
