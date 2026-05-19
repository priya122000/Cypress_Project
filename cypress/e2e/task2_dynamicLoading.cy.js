// cypress/e2e/task2_dynamicLoading.cy.js
// Task-2: Dynamic Loading - Wait for element to appear after loading
// URL: https://the-internet.herokuapp.com/dynamic_loading

import DynamicLoadingPage from '../pages/DynamicLoadingPage';

describe('Task-2: Dynamic Loading - Verify element appears after loading', () => {

  // ─── Example 1: Hidden Element ────────────────────────────────────
  describe('Example 1 - Element Hidden on Page', () => {

    beforeEach(() => {
      DynamicLoadingPage.navigateToExample(1);
    });

    it('TC-01: Should load Example 1 page with Start button', () => {
      cy.url().should('include', '/dynamic_loading/1');
      DynamicLoadingPage.assertStartButtonVisible();
      cy.get('#finish').should('not.be.visible');
    });

    it('TC-02: Should click Start and show "Hello World!" after loading', () => {
      // Click the Start button
      DynamicLoadingPage.clickStart();

      // Loading bar should be visible
      cy.get('#loading').should('be.visible');

      // Wait for loading to complete and text to appear
      DynamicLoadingPage.assertLoadingComplete('Hello World!');
    });

    it('TC-03: Should verify loading bar disappears after loading completes', () => {
      DynamicLoadingPage.clickStart();

      // Loading bar visible during process
      cy.get('#loading').should('be.visible');

      // Loading bar disappears after completion
      cy.get('#loading').should('not.be.visible');

      // Final text is displayed
      cy.get('#finish h4').should('be.visible').and('contain.text', 'Hello World!');
    });
  });

  // ─── Example 2: Rendered After Load ──────────────────────────────
  describe('Example 2 - Element Rendered After Load', () => {

    beforeEach(() => {
      DynamicLoadingPage.navigateToExample(2);
    });

    it('TC-04: Should load Example 2 page with Start button visible', () => {
      cy.url().should('include', '/dynamic_loading/2');
      DynamicLoadingPage.assertStartButtonVisible();
    });

    it('TC-05: Should click Start and verify "Hello World!" appears after loading', () => {
      DynamicLoadingPage.clickStart();

      // Wait for element to be rendered in the DOM
      cy.get('#finish h4', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Hello World!');
    });

    it('TC-06: Should verify the finish element does not exist before clicking Start', () => {
      // Before clicking, #finish should not contain visible text
      cy.get('#finish').should('be.empty');

      DynamicLoadingPage.clickStart();

      cy.get('#finish h4').should('be.visible').and('have.text', 'Hello World!');
    });
  });
});
