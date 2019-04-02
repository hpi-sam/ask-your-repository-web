// @flow

async function createGoogleAuthInstance() {
  const gapi = await require('google-client-api')();
  if (!gapi.auth2.getAuthInstance()) {
    await gapi.auth2.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: 'profile email',
    });
  }
  return gapi.auth2.getAuthInstance();
}

export default createGoogleAuthInstance;
