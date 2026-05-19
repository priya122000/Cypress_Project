// cypress/support/e2e.js
// This file runs before every spec file

import './commands';

// Suppress uncaught exception errors from the app under test
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  return false;
});
