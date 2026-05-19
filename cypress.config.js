const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "spec",
});
