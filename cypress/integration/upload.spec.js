context('Upload', () => {
  let activeTeam;
  let user;

  beforeEach(() => {
    cy.resetDB();
    cy.authenticate()
      .then((authUser) => {
        user = authUser;
      });
    cy.setActiveTeam()
      .then((team) => {
        activeTeam = team;
      });
    cy.visit('/upload');
  });

  context('uploading a single image', () => {
    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.get('[data-cy=upload-dropzone]').drop(['sheep.jpg']);
    });

    it('uploads the image for the correct team', () => {
      cy.wait('@uploadImage')
        .its('response.body.team_id')
        .should('be.eq', activeTeam.id);
    });
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
      cy.get('[data-cy=tag-selector-input]')
        .type('Sheep{enter}')
        .type('Sweet{enter}{backspace}') // add and delete tag
        .type('Cute{enter}');

      cy.get('[data-cy=save-button]').click();

      cy.wait('@updateManyImages');

      cy.request({
        url: `${Cypress.env('API_URL')}/images`,
        headers: {
          'X-CSRF-Token': user.csrfToken,
        },
      })
        .then((response) => {
          const [image] = response.body.images;
          expect(image.user_tags).to.have.members(['Sheep', 'Cute']);
        });
    });
  });

  context('uploading multiple images', () => {
    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.route({ method: 'PATCH', url: '/images' }).as('updateManyImages');
      cy.get('[data-cy=upload-dropzone]').drop(['goat.jpg', 'sheep.jpg']);
      cy.wait('@uploadImage');
    });

    it('saves the entered tags and multi tags correctly', () => {
      cy.get('[data-cy=tag-selector-input]', { timeout: 20000 })
        .type('Cute{enter}')
        .type('Sheep{enter}');

      // set 'Cute' as multi tag
      cy.get('[data-cy=tag-selector-tag]').eq(0)
        .click();

      // select next image
      cy.get('[data-cy=upload-list-item]').eq(1)
        .click();

      cy.get('[data-cy=tag-selector-input]')
        .type('Goat{enter}');

      cy.get('[data-cy=save-button]').click();

      cy.wait('@updateManyImages');

      cy.request({
        url: `${Cypress.env('API_URL')}/images`,
        headers: {
          'X-CSRF-Token': user.csrfToken,
        },
      })
        .then((response) => {
          expect(response.body.images).to.containSubset([{ user_tags: ['Cute', 'Sheep'] }]);
          expect(response.body.images).to.containSubset([{ user_tags: ['Goat', 'Cute'] }]);
        });
    });
  });
});
