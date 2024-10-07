const { defineConfig } = require("cypress");

module.exports = defineConfig({
  trashAssetsBeforeRuns: true,
  
  // Folders / Files Configuration
  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,
  video: true,
  videosFolder: 'cypress/videos',
  videoCompression: false,

  // Viewport
  viewportHeight: 800,
  viewportWidth: 1200,

  // Timeouts
  defaultCommandTimeout: 5000,

  // Report Configuration
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  // Retry Configuration
  retries: {
    runMode: 1,
    openMode: 1,
  },

  // e2e Configuration Object
  e2e: {
    // Specify only the LoginTest to be executed
    specPattern: 'cypress/e2e/tests/LoginTest.cy.js',

    // Path to the support file
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      const environmentName = config.env.environmentName || 'local';
      const environmentFilename = `./settings/${environmentName}.settings.json`;
      console.log('Loading settings from: ', environmentFilename);
      
      const settings = require(environmentFilename);

      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }

      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }

      console.log('Loaded settings for environment:', environmentName);

      // Commenting out unnecessary reporter and plugin configurations
      // require('cypress-mochawesome-reporter/plugin')(on);  
      // require('@cypress/grep/src/plugin')(config);

      return config;
    },

    env: {
      URL: 'https://www.saucedemo.com/',
    },
  },
});
