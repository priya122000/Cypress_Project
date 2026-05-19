// cypress/e2e/task1_fileUpload.cy.js
// Task-1: Verify file is uploaded successfully
// URL: https://the-internet.herokuapp.com/upload
// Note: Uses only CSS Selectors (as per assignment guidelines)

import FileUploadPage from '../pages/FileUploadPage';

describe('Task-1: File Upload - Verify file is uploaded successfully', () => {

  beforeEach(() => {
    // Navigate to upload page before each test
    FileUploadPage.navigate();
  });

  // ─── Test Case 1: Page Loads Correctly ──────────────────────────
  it('TC-01: Should load the file upload page successfully', () => {
    // Assert URL
    cy.url().should('include', '/upload');

    // Assert page title is visible
    cy.get('h3').should('be.visible').and('contain.text', 'File Uploader');

    // Assert file input exists
    cy.get('#file-upload').should('exist');

    // Assert upload button is visible
    cy.get('#file-submit').should('be.visible').and('have.value', 'Upload');
  });

  // ─── Test Case 2: Upload PDF via Standard File Input ────────────
  it('TC-02: Should upload a PDF file using file input and verify success', () => {
    // Select file using CSS selector - uses only CSS Selectors
    cy.get('#file-upload').selectFile('cypress/fixtures/sample.pdf', { force: true });

    // Assert file is selected (input has value)
    cy.get('#file-upload').should('have.value').and('not.be.empty');

    // Click upload button
    cy.get('#file-submit').click();

    // Assert success heading
    cy.get('h3').should('be.visible').and('contain.text', 'File Uploaded!');

    // Assert uploaded file name is displayed
    cy.get('#uploaded-files')
      .should('be.visible')
      .and('contain.text', 'sample.pdf');
  });

  // ─── Test Case 3: Drag and Drop PDF File ────────────────────────
  it('TC-03: Should upload a PDF file via drag-and-drop and verify success', () => {
    // Drag and drop using CSS selector - uses only CSS Selectors
    cy.get('#file-upload').selectFile('cypress/fixtures/sample.pdf', {
      action: 'drag-drop',
      force: true,
    });

    // Click upload button
    cy.get('#file-submit').click();

    // Assert success message is displayed
    cy.get('h3')
      .should('be.visible')
      .and('have.text', 'File Uploaded!');

    // Assert the uploaded file name appears in results
    cy.get('#uploaded-files')
      .should('be.visible')
      .and('contain.text', 'sample.pdf');
  });

  // ─── Test Case 4: Upload using POM methods ───────────────────────
  it('TC-04: Should upload file using POM and assert result page contains file name', () => {
    // Use POM page actions
    FileUploadPage.assertPageLoaded();
    FileUploadPage.uploadAndSubmit('sample.pdf');

    // Use POM assertions
    FileUploadPage.assertUploadSuccess();
    FileUploadPage.assertUploadedFileName('sample.pdf');
  });

  // ─── Test Case 5: Verify upload button state ─────────────────────
  it('TC-05: Should have the upload button enabled before and after file selection', () => {
    // Assert button is enabled initially
    cy.get('#file-submit')
      .should('be.visible')
      .and('not.be.disabled');

    // Select a file
    cy.get('#file-upload').selectFile('cypress/fixtures/sample.pdf', { force: true });

    // Assert button is still enabled after file selection
    cy.get('#file-submit')
      .should('be.visible')
      .and('not.be.disabled');
  });

  // ─── Test Case 6: Upload non-PDF file (robustness check) ─────────
  it('TC-06: Should successfully upload a .txt file and display the file name', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/sample.txt', { force: true });
    cy.get('#file-submit').click();

    cy.get('h3').should('contain.text', 'File Uploaded!');
    cy.get('#uploaded-files').should('contain.text', 'sample.txt');
  });
});
