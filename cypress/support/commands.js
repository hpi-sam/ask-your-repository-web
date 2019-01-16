Cypress.Commands.add('setActiveTeam', () => {
  const options = {
    method: 'POST',
    url: `${Cypress.env('API_URL')}/teams`,
    body: { name: 'Seed Team' },
  };

  return cy.request(options)
    .then((response) => {
      cy.visit('/');
      const team = response.body;

      return cy
        .get(`[data-cy=team-select-item-${team.id}]`)
        .click()
        .then(() => team);
    });
});

Cypress.Commands.add('upload', {
  prevSubject: 'element',
}, (subject, fileUrl) => cy.fixture(fileUrl, 'base64')
  .then(Cypress.Blob.base64StringToBlob)
  .then((blob) => {
    cy.window().then((window) => {
      const file = new window.File([blob], fileUrl);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      cy.wrap(subject).trigger('drop', { dataTransfer });
    });
  }));
