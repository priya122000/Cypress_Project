# QA Automation Assignment - Cypress E2E Tests

## Objective
End-to-end automation test cases using **Cypress** with **Page Object Model (POM)** structure for [the-internet.herokuapp.com](https://the-internet.herokuapp.com).

---

## Project Structure

```
qa-automation/
├── cypress/
│   ├── e2e/                          # Test Spec Files (one per task)
│   │   ├── task1_fileUpload.cy.js    # Task-1: File Upload
│   │   ├── task2_dynamicLoading.cy.js# Task-2: Dynamic Loading
│   │   └── task3_login.cy.js        # Task-3: Login / Logout
│   ├── fixtures/                    # Test data files
│   │   ├── sample.pdf               # PDF file for upload tests
│   │   └── sample.txt               # TXT file for upload tests
│   ├── pages/                       # POM - Page Object Classes
│   │   ├── FileUploadPage.js        # Page Object for /upload
│   │   ├── DynamicLoadingPage.js    # Page Object for /dynamic_loading
│   │   └── LoginPage.js             # Page Object for /login
│   └── support/
│       ├── commands.js              # Custom Cypress commands
│       └── e2e.js                   # Global support file
├── cypress.config.js                # Cypress configuration
├── package.json
├── .gitignore
└── README.md
```

---

## Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/qa-automation.git
cd qa-automation

# 2. Install dependencies
npm install

# 3. Run all tests in headless mode (Chrome)
npm run test:headless

# 4. Run tests in Cypress GUI
npm run test:open
```

---

## Run Individual Task Tests

```bash
# Task 1 only
npm run test:task1

# Task 2 only
npm run test:task2

# Task 3 only
npm run test:task3

# All tasks
npm run test:all
```

---

## Guidelines Followed

| Guideline | Implementation |
|---|---|
| Different assertion types | `should('be.visible')`, `should('contain.text')`, `should('include')`, `should('not.be.disabled')` |
| Chrome latest version | `--browser chrome` in all npm scripts |
| Headless execution | `--headless` flag in `test:headless` script |
| POM structure | Separate `pages/` directory with classes for each page |
| All tests in same program | All specs in `cypress/e2e/` share pages, fixtures, and commands |
| One application | All tests use `https://the-internet.herokuapp.com` |
| CSS Selectors only (Task-1) | `#file-upload`, `#file-submit`, `#uploaded-files`, `h3` |

---

## Test Cases Summary

### Task-1: File Upload (`/upload`)
| TC | Description |
|---|---|
| TC-01 | Page loads with correct title and elements |
| TC-02 | Upload PDF via file input → success page |
| TC-03 | Upload PDF via drag-and-drop → success page |
| TC-04 | Full POM-based upload and assertion |
| TC-05 | Upload button enabled before and after selection |
| TC-06 | Upload .txt file and verify file name shown |

### Task-2: Dynamic Loading (`/dynamic_loading`)
| TC | Description |
|---|---|
| TC-01 | Example 1 loads with Start button |
| TC-02 | Click Start → "Hello World!" appears |
| TC-03 | Loading bar disappears after completion |
| TC-04 | Example 2 loads with Start button |
| TC-05 | Click Start → element rendered after loading |
| TC-06 | Element absent before Start, visible after |

### Task-3: Login (`/login`)
| TC | Description |
|---|---|
| TC-01 | Login page loads with all elements |
| TC-02 | Valid credentials → success message + redirect |
| TC-03 | Invalid username → error flash |
| TC-04 | Invalid password → error flash |
| TC-05 | Empty fields → error flash |
| TC-06 | Logout redirects with success message |
| TC-07 | Full login-logout flow via POM |

---

## Author
QA Automation Assignment — Cypress + POM
