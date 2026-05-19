// cypress/e2e/task3_login.cy.js
// Task-3: Verify Login Functionality
// URL: https://the-internet.herokuapp.com/login

import LoginPage from '../pages/LoginPage';

describe('Task-3: Login Page - Verify Login and Logout Functionality', () => {

  beforeEach(() => {
    LoginPage.navigate();
  });

  // ─── Test Case 1: Page Load ────────────────────────────────────
  it('TC-01: Should load the login page with all required elements', () => {
    cy.url().should('include', '/login');
    cy.get('h2').should('be.visible').and('contain.text', 'Login Page');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
  });

  // ─── Test Case 2: Valid Login ──────────────────────────────────
  it('TC-02: Should login successfully with valid credentials', () => {
    LoginPage.login('tomsmith', 'SuperSecretPassword!');

    // Assert redirect to secure page
    cy.url().should('include', '/secure');

    // Assert success flash message
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged into a secure area!');

    // Assert logout button appears
    cy.get('[href="/logout"]').should('be.visible');
  });

  // ─── Test Case 3: Invalid Username ────────────────────────────
  it('TC-03: Should show error for invalid username', () => {
    LoginPage.login('wronguser', 'SuperSecretPassword!');

    cy.url().should('include', '/login');
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');
  });

  // ─── Test Case 4: Invalid Password ────────────────────────────
  it('TC-04: Should show error for invalid password', () => {
    LoginPage.login('tomsmith', 'wrongpassword');

    cy.url().should('include', '/login');
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your password is invalid!');
  });

  // ─── Test Case 5: Empty Fields ─────────────────────────────────
  it('TC-05: Should show error when submitting empty credentials', () => {
    cy.get('[type="submit"]').click();

    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');
  });

  // ─── Test Case 6: Successful Logout ───────────────────────────
  it('TC-06: Should logout successfully after login', () => {
    // Login first
    LoginPage.login('tomsmith', 'SuperSecretPassword!');
    cy.url().should('include', '/secure');

    // Logout
    LoginPage.clickLogout();

    // Assert redirect back to login with logout message
    cy.url().should('include', '/login');
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'You logged out of the secure area!');
  });

  // ─── Test Case 7: Using POM assertions ────────────────────────
  it('TC-07: Should validate full login flow using POM', () => {
    LoginPage.assertLoginPageLoaded();
    LoginPage.login('tomsmith', 'SuperSecretPassword!');
    LoginPage.assertLoginSuccess();
    LoginPage.clickLogout();
    LoginPage.assertLoggedOut();
  });
});
