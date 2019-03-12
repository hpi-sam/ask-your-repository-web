context('Edit Image Mobile', () => {
  let image;

  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.resetDB();
    cy.authenticate();
    cy.setActiveTeam()
      .then((team) => {
        cy.createImage('goat.jpg', team.id, ['Goat'])
          .then((createdImage) => {
            image = createdImage;
            cy.visit(`/images/${image.id}/edit`);
            cy.server();
            cy.route({ method: 'PATCH', url: `/images/${image.id}` }).as('updateImage');
          });
      });
  });

  it('saves the tags', () => {
    cy.get('[data-cy=tag-remove-button-Goat]').click();
    cy.get('[data-cy=tag-input]')
      .type('Nice{enter}')
      .type('Cool{enter}');

    cy.get('[data-cy=save-button]').click();
    cy.wait('@updateImage');

    const expectedTags = ['Nice', 'Cool'];

    cy.request(`${Cypress.env('API_URL')}/images/${image.id}`)
      .its('body.user_tags')
      .should('have.members', expectedTags);
  });
});
