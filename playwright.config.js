require('dotenv').config();
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
  ['html'],
  ['./utils/jira.reporter.js'],
],
  use: {
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': process.env.REQRES_API_KEY || '',
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api-tests',
      testMatch: '**/api/**/*.spec.js',
    },
    {
      name: 'chromium',
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { slowMo: 1000 },
      },
    },
    {
      name: 'firefox',
      testIgnore: '**/api/**',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: '**/api/**',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});