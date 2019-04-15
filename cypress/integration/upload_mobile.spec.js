context('Mobile Upload', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.resetDB();
    cy.authenticate().as('auth');
    cy.setActiveTeam();
    cy.visit('/upload');
  });

  context('tagging a single uploaded image', () => {
    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.route({ method: 'PATCH', url: '/images' }).as('updateManyImages');
      cy.get('[data-cy=upload-dropzone]').drop(['sheep.jpg']);
      cy.wait('@uploadImage');
    });

    it('saves the entered tags correctly', () => {
      cy.get('[data-cy=tag-input]')
        .type('Sheep{enter}')
        .type('Goat{enter}')
        .type('Cute{enter}');
      cy.get('[data-cy=tag-remove-button-Goat]').click();

      cy.get('[data-cy=save-button]').click();

      cy.wait('@updateManyImages');

      cy.requestWithAuth(`${Cypress.env('API_URL')}/images`)
        .then((response) => {
          const [image] = response.body.images;
          expect(image.user_tags).to.have.members(['Sheep', 'Cute']);
        });
    });
  });

  context('tagging multiple uploaded images', () => {
    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.route({ method: 'PATCH', url: '/images' }).as('updateManyImages');
      cy.get('[data-cy=upload-dropzone]').drop(['goat.jpg', 'sheep.jpg']);
      cy.wait('@uploadImage');
    });

    it('saves the entered tags and multi tags correctly', () => {
      cy.get('[data-cy=tag-input]', { timeout: 20000 })
        .type('Sheep{enter}')
        .type('Cute{enter}');

      // set 'Cute' as multi tag
      cy.get('[data-cy=tag-Cute]').eq(0)
        .click();

      // select next image
      cy.get('[data-cy=upload-list-item]').eq(1)
        .click();

      cy.get('[data-cy=tag-input]')
        .type('Goat{enter}');

      cy.get('[data-cy=save-button]').click();

      cy.wait('@updateManyImages');

      cy.requestWithAuth(`${Cypress.env('API_URL')}/images`)
        .then((response) => {
          expect(response.body.images).to.containSubset([{ user_tags: ['Cute', 'Sheep'] }]);
          expect(response.body.images).to.containSubset([{ user_tags: ['Goat', 'Cute'] }]);
        });
    });
  });
});
