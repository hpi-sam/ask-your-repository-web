import humps from 'humps';

Cypress.Commands.add('setActiveTeam', () => cy.window()
  .then((window) => {
    const options = {
      method: 'POST',
      url: `${Cypress.env('API_URL')}/teams`,
      body: { name: 'Seed Team' },
      headers: {
        'X-CSRF-Token': window.store.getState().auth.token,
      },
    };

    return cy.request(options)
      .then((response) => {
        const team = humps.camelizeKeys(response.body);

        window.store.dispatch({
          type: 'SET_ACTIVE_TEAM',
          team,
        });

        return team;
      });
  }));

Cypress.Commands.add('authenticate', () => cy.createUser({
  username: 'jenny',
  email: 'jenny@example.com',
  password: 'secret',
}).then((user) => {
  const options = {
    method: 'POST',
    url: `${Cypress.env('API_URL')}/authentications`,
    body: humps.decamelizeKeys({
      emailOrUsername: user.username,
      password: 'secret',
    }),
  };

  cy.visit('/');

  return cy.request(options)
    .then((response) => {
      const { token, ...authUser } = humps.camelizeKeys(response.body);

      return cy.window().then((window) => {
        window.store.dispatch({
          type: 'LOGIN',
          user: authUser,
          token,
        });

        return authUser;
      });
    });
}));

Cypress.Commands.add('createImage', (fixture, teamId, tags = []) => {
  const url = `${Cypress.env('API_URL')}/images`;

  cy.server();
  cy.route({ method: 'POST', url }).as('createImage');

  const sendRequest = (formData) => {
    cy.window().then((window) => {
      const xhr = new window.XMLHttpRequest();
      xhr.open('POST', url);
      xhr.send(formData);
    });
  };

  return cy.fixture(fixture, 'base64')
    .then(Cypress.Blob.base64StringToBlob)
    .then((blob) => {
      cy.window().then((window) => {
        const file = new window.File([blob], fixture);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('team_id', teamId);
        formData.append('user_tags', tags);

        sendRequest(formData);

        return cy.wait('@createImage').then((xhr) => {
          const image = humps.camelizeKeys(xhr.response.body);
          return image;
        });
      });
    });
});

Cypress.Commands.add('drop', {
  prevSubject: 'element',
}, (subject, fileUrls) => {
  const dataTransfer = new DataTransfer();

  fileUrls.forEach((fileUrl) => {
    cy.fixture(fileUrl, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        cy.window().then((window) => {
          const file = new window.File([blob], fileUrl);
          dataTransfer.items.add(file);
        });
      });
  });

  cy.wrap(subject).trigger('drop', { dataTransfer });
});

Cypress.Commands.add('createUser', ({ username, email, password }) => {
  const options = {
    method: 'POST',
    url: `${Cypress.env('API_URL')}/users`,
    body: {
      username,
      email,
      password,
      passwordRepeat: password,
    },
  };

  return cy.request(options)
    .then(response => humps.camelizeKeys(response.body));
});

Cypress.Commands.add('resetDB', () => {
  const options = {
    method: 'POST',
    url: `${Cypress.env('NEO4J_URL')}/db/data/transaction/commit`,
    body: {
      statements: [{
        statement: 'MATCH (n) DETACH DELETE n',
      }],
    },
  };

  cy.request(options);
});
