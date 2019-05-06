context('Team Invitation Link', () => {
  let team;

  beforeEach(() => {
    cy.server();
    cy.resetDB();
    cy.authenticate();
    cy.setActiveTeam()
      .then((activeTeam) => {
        team = activeTeam;
        cy.route({ method: 'GET', url: `/teams/${team.id}` }).as('team');
      });
  });

  it('adds current member to team after following invitation link', () => {
    cy.get('[data-cy=navbar-team-button]').click();
    cy.get('[data-cy=team-sidebar-settings-dropdown-button]').click();
    cy.wait('@team');
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
