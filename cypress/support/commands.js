// cypress/support/commands.js
// Custom Cypress Commands

// ─── Custom Command: Upload File via Input ────────────────────────────
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).selectFile(`cypress/fixtures/${fileName}`, { force: true });
});

// ─── Custom Command: Upload File via Drag-Drop ────────────────────────
Cypress.Commands.add('dragDropFile', (selector, fileName) => {
  cy.get(selector).selectFile(`cypress/fixtures/${fileName}`, {
    action: 'drag-drop',
    force: true,
  });
});

// ─── Custom Command: Login to the-internet ────────────────────────────
Cypress.Commands.add('loginToApp', (username, password) => {
  cy.visit('/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('[type="submit"]').click();
});

// ─── Custom Command: Assert Flash Message ─────────────────────────────
Cypress.Commands.add('assertFlashMessage', (text) => {
  cy.get('#flash').should('be.visible').and('contain.text', text);
});
