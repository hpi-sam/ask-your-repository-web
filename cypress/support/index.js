// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import chaiSubset from 'chai-subset'; // eslint-disable-line import/no-extraneous-dependencies

if (Cypress.env('API_URL').includes('https') || Cypress.env('API_URL').includes('api.askyour.cloud')) {
  throw new Error(`
    You are trying to run tests while having a remote API url configured.
    This is permitted. Use a local server instead.
  `);
}

chai.use(chaiSubset);
