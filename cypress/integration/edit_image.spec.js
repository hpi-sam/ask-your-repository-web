context('Edit Image', () => {
  let image;

  beforeEach(() => {
    cy.server();

    cy.setActiveTeam()
      .then((team) => {
        cy.createImage('goat.jpg', team.id, ['Goat'])
          .then((createdImage) => {
            image = createdImage;
            cy.visit(`/images/${image.id}/edit`);
            cy.route({ method: 'PATCH', url: `/images/${image.id}` }).as('updateImage');
          });
      });
  });

  it('redirects to the detail page on successful submit', () => {
    cy.get('[data-cy=save-button]').click();
    cy.wait('@updateImage');
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/images/${image.id}`);
    });
  });

  it('saves added tags', () => {
    cy.get('[data-cy=tag-selector-input]')
      .type('Nice{enter}')
      .type('Cool{enter}');

    cy.get('[data-cy=save-button]').click();
    cy.wait('@updateImage');

    const expectedTags = [...image.tags, 'Nice', 'Cool'];

    cy.request(`${Cypress.env('API_URL')}/images/${image.id}`)
      .its('body.tags')
      .should('have.members', expectedTags);
  });

  it('saves removed tags', () => {
    cy.get('[data-cy=tag-selector-input]')
      .type('{backspace}');

    cy.get('[data-cy=save-button]').click();
    cy.wait('@updateImage');

    const expectedTags = image.tags.slice(0, -1);

    cy.request(`${Cypress.env('API_URL')}/images/${image.id}`)
      .its('body.tags')
      .should('have.members', expectedTags);
  });
});
