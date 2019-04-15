context('Search', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.authenticate();
    cy.setActiveTeam().as('team');
    cy.get('@team').then((team) => {
      cy.createImage('goat.jpg', team.id, ['Goat', 'Cute']);
      cy.createImage('sheep.jpg', team.id, ['Sheep', 'Cute']);
    });

    cy.server();
    cy.route({ method: 'GET', url: '/images' }).as('search');

    cy.visit('/images');
  });

  it('finds the image tagged with the search term', () => {
    cy.get('[data-cy=search-input]').type('Goat{Enter}');
    cy.wait('@search');
    cy.get('[data-cy=gallery-item-Goat-Cute]').should('be.visible');

    cy.get('[data-cy=search-input]').clear().type('Sheep{Enter}');
    cy.wait('@search');
    cy.get('[data-cy=gallery-item-Sheep-Cute]').should('be.visible');

    cy.get('[data-cy=search-input]').clear().type('Cute{Enter}');
    cy.wait('@search');
    cy.get('[data-cy=gallery-item-Goat-Cute]').should('be.visible');
    cy.get('[data-cy=gallery-item-Sheep-Cute]').should('be.visible');
  });
});
