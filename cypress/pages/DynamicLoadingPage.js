// cypress/pages/DynamicLoadingPage.js
// Page Object Model for Dynamic Loading Page
// URL: https://the-internet.herokuapp.com/dynamic_loading

class DynamicLoadingPage {
  // ─── CSS Selectors ───────────────────────────────────────────────
  get pageHeading()     { return cy.get('h3');                          }
  get startButton()     { return cy.get('#start button');               }
  get loadingBar()      { return cy.get('#loading');                    }
  get finishText()      { return cy.get('#finish h4');                  }
  get example1Link()    { return cy.get('[href="/dynamic_loading/1"]'); }
  get example2Link()    { return cy.get('[href="/dynamic_loading/2"]'); }

  // ─── Actions ─────────────────────────────────────────────────────

  navigate() {
    cy.visit('/dynamic_loading');
  }

  navigateToExample(exampleNumber) {
    cy.visit(`/dynamic_loading/${exampleNumber}`);
  }

  clickStart() {
    this.startButton.click();
  }

  // ─── Assertions ──────────────────────────────────────────────────

  assertPageLoaded() {
    cy.url().should('include', '/dynamic_loading');
    this.pageHeading.should('be.visible');
  }

  assertLoadingComplete(expectedText) {
    // Wait for loading bar to disappear
    this.loadingBar.should('not.be.visible');
    // Assert finish text is visible and correct
    this.finishText
      .should('be.visible')
      .and('contain.text', expectedText);
  }

  assertStartButtonVisible() {
    this.startButton.should('be.visible').and('contain.text', 'Start');
  }
}

module.exports = new DynamicLoadingPage();
