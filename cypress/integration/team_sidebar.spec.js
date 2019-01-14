context('Team Sidebar', () => {
  beforeEach(() => {
    cy.setActiveTeam();
  });

  context('is closed', () => {
    it('opens the sidebar by clicking on the team avatar', () => {
      cy.get('[data-cy=navbar-team-button]').click();
      cy.get('[data-cy=team-sidebar]').should('be.visible');
    });
  });

  context('is open', () => {
    beforeEach(() => {
      cy.get('[data-cy=navbar-team-button]').click();
    });

    it('closes the sidebar when clicking outside', () => {
      cy.get('body').click('bottomRight');
      cy.get('[data-cy=team-sidebar]').should('not.be.visible');
    });

    describe('add button', () => {
      it('opens team form', () => {
        cy.get('[data-cy=team-sidebar-add-button]').click();
        cy.get('[data-cy=team-sidebar-form]').should('be.visible');
      });
    });

    context('team form is open', () => {
      beforeEach(() => {
        cy.get('[data-cy=team-sidebar-add-button]').click();
      });

      it('closes the form when clicking the close button', () => {
        cy.get('[data-cy=team-sidebar-form] [data-cy=close-button]').click();
        cy.get('[data-cy=team-sidebar-form]').should('not.be.visible');
      });

      context('submitting', () => {
        beforeEach(() => {
          cy.server();
          cy.route({ method: 'POST', url: '/teams' }).as('createTeam');

          cy.get('[data-cy=team-sidebar-form] input[type=text]').type('My New Team');
          cy.get('[data-cy=team-sidebar-form] [data-cy=save-button]').click();
        });

        it('creates a team', () => {
          cy.wait('@createTeam')
            .its('response.body')
            .should('have.property', 'name', 'My New Team');
        });

        it('closes the form', () => {
          cy.wait('@createTeam');
          cy.get('[data-cy=team-sidebar-form]').should('not.be.visible');
        });
      });
    });
  });
});
