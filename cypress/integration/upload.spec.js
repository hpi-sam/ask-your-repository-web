context('Upload', () => {
  let activeTeam;

  beforeEach(() => {
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
    let imageId;

    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.route({ method: 'PATCH', url: '/images' }).as('updateManyImages');
      cy.get('[data-cy=upload-dropzone]').drop(['sheep.jpg']);
      cy.wait('@uploadImage')
        .then((xhr) => { imageId = xhr.response.body.id; });
    });

    it('saves the entered tags correctly', () => {
      cy.get('[data-cy=tag-selector-input]')
        .type('Sheep{enter}')
        .type('Sweet{enter}{backspace}') // add and delete tag
        .type('Cute{enter}');

      cy.get('[data-cy=save-button]').click();

      cy.request(`${Cypress.env('API_URL')}/images/${imageId}`)
        .its('body.tags')
        .should('be.deep.eq', ['Sheep', 'Cute']);
    });
  });

  context('uploading multiple images', () => {
    const imageIds = [];

    beforeEach(() => {
      cy.server();
      cy.route({ method: 'POST', url: '/images' }).as('uploadImage');
      cy.route({ method: 'PATCH', url: '/images' }).as('updateManyImages');
      cy.get('[data-cy=upload-dropzone]').drop(['goat.jpg', 'sheep.jpg']);

      cy.wait(['@uploadImage', '@uploadImage'])
        .then((xhrs) => {
          xhrs.forEach((xhr) => {
            imageIds.push(xhr.response.body.id);
          });
        });
    });

    it('saves the entered tags and multi tags correctly', () => {
      cy.get('[data-cy=tag-selector-input]')
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

      cy.request(`${Cypress.env('API_URL')}/images/${imageIds[0]}`)
        .its('body.tags')
        .should('be.deep.eq', ['Cute', 'Sheep']);

      cy.request(`${Cypress.env('API_URL')}/images/${imageIds[1]}`)
        .its('body.tags')
        .should('be.deep.eq', ['Cute', 'Goat']);
    });
  });
});
