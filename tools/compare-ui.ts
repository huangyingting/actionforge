import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const target = process.env.TEST_URL || 'http://127.0.0.1:4173/actionforge/';
const output = process.env.UI_OUTPUT || '/tmp/actionforge-ui';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
});
try {
  for (const viewport of [{ width: 1600, height: 1000 }, { width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    for (const route of ['', 'motion-lab.html']) {
      const snapshots = [];
      for (const [label, origin] of [['reference', 'https://actionforge.app/'], ['recovered', target]]) {
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();
        await page.addInitScript(() => {
          document.addEventListener('af:ready', () => { document.documentElement.dataset.afReady = 'true'; });
        });
        await page.goto(new URL(route, origin).href, { waitUntil: 'networkidle', timeout: 120000 });
        if (!route) await page.waitForSelector('html[data-af-ready="true"]');
        else await page.waitForFunction(() => document.getElementById('status')?.textContent !== 'Loading…');
        await page.evaluate(async () => { await document.fonts.ready; });
        const selectors = route
          ? ['#bar', '#left', '#viewport', '#right', '#lib', '#curveDock']
          : ['.af-bar', '.lib-left', '.lib-stage', '.lib-drawer', '.lib-panel', '.lib-transport'];
        const snapshot = await page.evaluate(selectors => selectors.map(selector => {
          const element = document.querySelector(selector);
          if (!element) throw new Error(`Missing ${selector}`);
          const style = getComputedStyle(element);
          return {
            selector, rect: element.getBoundingClientRect().toJSON(),
            font: style.font, background: style.backgroundColor,
            color: style.color, border: style.borderColor, display: style.display,
          };
        }), selectors);
        snapshots.push(snapshot);
        await page.screenshot({ path: `${output}/${label}-${route ? 'lab' : 'workspace'}-${viewport.width}.png` });
        await context.close();
      }
      assert.deepEqual(snapshots[1], snapshots[0], `${route || 'workspace'} at ${viewport.width}px`);
      console.log(`Matched layout, fonts, colors and borders: ${route || 'workspace'} at ${viewport.width}px`);
    }
  }
} finally {
  await browser.close();
}
