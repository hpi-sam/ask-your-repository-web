// @flow

function createGoogleAuthInstance(): Promise<any> {
  return new Promise((resolve) => {
    require('google-client-api')().then((gapi) => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'profile email',
      }).then(() => {
        resolve(gapi.auth2.getAuthInstance());
      });
    });
  });
}

export default createGoogleAuthInstance;
