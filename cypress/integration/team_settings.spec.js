context('Team Settings', () => {
  context('Google Drive Sync', () => {
    beforeEach(() => {
      cy.resetDB();
      cy.authenticate();
      cy.setActiveTeam();
      cy.get('[data-cy=navbar-team-button]').click();
      cy.get('[data-cy=team-sidebar-settings-dropdown-button]').click();
    });

    context('folder already exists', () => {
      it('shows button to revoke access if folder exists', () => {
        cy.get('[data-cy=team-settings-googledrive-revoke-access]').should('be.visible');
      });

      it('opens modal on revoke access', () => {
        cy.get('[data-cy=team-settings-googledrive-revoke-access]').click()
          .then(() => {
            cy.contains('Are you sure you want to revoke the access?').should('be.visible');
          });
      });
    });

    context('folder does not exist', () => {
      beforeEach(() => {
        cy.resetDB();
        cy.authenticate();
        cy.setActiveTeam();
        cy.get('[data-cy=navbar-team-button]').click();
        cy.get('[data-cy=team-sidebar-settings-dropdown-button]').click();
      });

      it('shows button to connect if no folder', () => {
        cy.get('[data-cy=team-settings-googledrive-connect-button]').should('be.visible');
      });
    });
  });
});
