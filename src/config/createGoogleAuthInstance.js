// @flow
import clientCreator from 'google-client-api';

async function createGoogleAuthInstance() {
  const gapi = await clientCreator();

  await gapi.client.init({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: 'profile email',
  });

  return gapi.auth2.getAuthInstance();
}

export default createGoogleAuthInstance;
