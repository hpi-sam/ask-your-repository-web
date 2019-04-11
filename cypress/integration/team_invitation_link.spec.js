context('Team Invitation Link', () => {
  let team;

  beforeEach(() => {
    cy.resetDB();
    cy.authenticate();
    cy.setActiveTeam()
      .then((activeTeam) => {
        team = activeTeam;
      });
  });

  it('adds current member to team after following invitation link', () => {
    cy.get('[data-cy=navbar-team-button]').click();
    cy.get('[data-cy=team-sidebar-settings-dropdown-button]').click();
    cy.get('[data-cy=team-sidebar-settings-invite-button]').click();
    cy.get('[data-cy=team-sidebar-settings-invite-input]')
      .invoke('val')
      .then((url) => {
        cy.authenticate('Erik', 'erik@email.com')
          .then(() => {
            const redirect = url.substring(url.indexOf('/invites'));
            cy.visit(redirect);
            cy.contains(team.name).should('be.visible');
          });
      });
  });
});
