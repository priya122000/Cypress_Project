// cypress/pages/FileUploadPage.js
// Page Object Model for File Upload Page
// URL: https://the-internet.herokuapp.com/upload

class FileUploadPage {
  // ─── CSS Selectors ───────────────────────────────────────────────
  get uploadDropZone()    { return cy.get('#drag-drop-upload');         }
  get fileInput()         { return cy.get('#file-upload');              }
  get submitButton()      { return cy.get('#file-submit');              }
  get uploadedFileName()  { return cy.get('#uploaded-files');           }
  get pageTitle()         { return cy.get('h3');                        }
  get dropZoneText()      { return cy.get('.dz-default.dz-message');    }

  // ─── Actions ─────────────────────────────────────────────────────

  /**
   * Navigate to the File Upload page
   */
  navigate() {
    cy.visit('/upload');
  }

  /**
   * Upload a file using the file input (standard upload)
   * @param {string} fileName - file name inside cypress/fixtures/
   */
  uploadFileViaInput(fileName) {
    this.fileInput.selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }

  /**
   * Upload a file via drag-and-drop simulation
   * @param {string} fileName - file name inside cypress/fixtures/
   */
  uploadFileViaDragDrop(fileName) {
    this.fileInput.selectFile(`cypress/fixtures/${fileName}`, {
      action: 'drag-drop',
      force: true,
    });
  }

  /**
   * Click the upload submit button
   */
  clickUpload() {
    this.submitButton.click();
  }

  /**
   * Full upload flow: select file + submit
   * @param {string} fileName
   */
  uploadAndSubmit(fileName) {
    this.uploadFileViaInput(fileName);
    this.clickUpload();
  }

  // ─── Assertions ──────────────────────────────────────────────────

  /**
   * Assert success page heading is visible
   */
  assertUploadSuccess() {
    this.pageTitle.should('be.visible').and('contain.text', 'File Uploaded!');
  }

  /**
   * Assert the uploaded file name is shown on the result page
   * @param {string} fileName
   */
  assertUploadedFileName(fileName) {
    this.uploadedFileName
      .should('be.visible')
      .and('contain.text', fileName);
  }

  /**
   * Assert the upload page loads with the drop zone visible
   */
  assertPageLoaded() {
    cy.url().should('include', '/upload');
    this.fileInput.should('exist');
    this.submitButton.should('be.visible');
  }
}

module.exports = new FileUploadPage();
