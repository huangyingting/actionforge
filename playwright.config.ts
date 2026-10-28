import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  expect: { timeout: 20000 },
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.TEST_URL || 'http://127.0.0.1:4173/actionforge/',
    viewport: { width: 1600, height: 1000 },
    actionTimeout: 20000,
    launchOptions: {
      executablePath: process.env.CHROME_PATH || (process.env.CI ? undefined : '/usr/bin/google-chrome'),
      args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
    },
    trace: 'retain-on-failure',
  },
  webServer: process.env.TEST_URL ? undefined : {
    command: 'npm run preview -- --port 4173',
    url: 'http://127.0.0.1:4173/actionforge/',
    reuseExistingServer: !process.env.CI,
  },
});
