import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://192.168.1.135:4200',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
