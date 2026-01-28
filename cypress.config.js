const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://reebok.abfrl.in", 
    experimentalSessionAndOrigin: true,  // ✅ Your application URL
    defaultCommandTimeout: 10000,         // ✅ Wait for elements (10s)
    pageLoadTimeout: 60000,               // ✅ Page load timeout (60s)
    requestTimeout: 15000,                // ✅ API / network calls
    responseTimeout: 15000,               // ✅ API responses
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {

    },
  },
});
