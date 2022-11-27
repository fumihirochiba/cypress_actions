import { defineConfig } from "cypress";
import * as webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin, afterRunHandler } from "@badeball/cypress-cucumber-preprocessor";
import * as fs from "fs";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config, {
    omitAfterRunHandler: true,
  });

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  on("after:run", (results) => {
    if (results) {
      try{
        fs.mkdirSync("report/logs/cypress", { recursive: true });
        fs.writeFileSync("report/logs/cypress/runInfo.json", JSON.stringify(results, null, 2));
      }
      catch(e){
        console.log(e.message);
      }
    }
    afterRunHandler(config);
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:1234',
    specPattern: "cypress/integration/features/**/*.feature",
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
    setupNodeEvents,
  },
});