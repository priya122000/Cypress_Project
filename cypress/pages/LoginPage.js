// cypress/pages/LoginPage.js
// Page Object Model for Login (Secure Area) Page
// URL: https://the-internet.herokuapp.com/login

class LoginPage {
  // ─── CSS Selectors ───────────────────────────────────────────────
  get usernameInput()   { return cy.get('#username');                   }
  get passwordInput()   { return cy.get('#password');                   }
  get loginButton()     { return cy.get('[type="submit"]');             }
  get flashMessage()    { return cy.get('#flash');                      }
  get logoutButton()    { return cy.get('[href="/logout"]');            }
  get pageHeading()     { return cy.get('h2');                         }

  // ─── Actions ─────────────────────────────────────────────────────

  navigate() {
    cy.visit('/login');
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickLogin() {
    this.loginButton.click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  clickLogout() {
    this.logoutButton.click();
  }

  // ─── Assertions ──────────────────────────────────────────────────

  assertLoginPageLoaded() {
    cy.url().should('include', '/login');
    this.loginButton.should('be.visible');
  }

  assertLoginSuccess() {
    cy.url().should('include', '/secure');
    this.flashMessage
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!');
    this.logoutButton.should('be.visible');
  }

  assertLoginFailure(errorText) {
    this.flashMessage
      .should('be.visible')
      .and('contain.text', errorText);
  }

  assertLoggedOut() {
    cy.url().should('include', '/login');
    this.flashMessage
      .should('be.visible')
      .and('contain.text', 'You logged out of the secure area!');
  }
}

module.exports = new LoginPage();
