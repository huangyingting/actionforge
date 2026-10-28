import { expect, test } from '@playwright/test';
import type { Download, Locator, Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { zstdDecompressSync } from 'node:zlib';
import { createShareURL, resolvePagesURL } from '../src/pages-compatibility';

async function openWorkspace(page: Page) {
  await page.addInitScript(() => {
    document.addEventListener('af:ready', () => { document.documentElement.dataset.afReady = 'true'; });
  });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-af-ready', 'true');
  await expect(page.locator('#lib-count')).toHaveText('85 clips');
  await expect(page.locator('#lib-playpause')).toBeVisible();
}

async function bytes(download: Download) {
  const file = await download.path();
  expect(file).toBeTruthy();
  return readFile(file!);
}

async function setRange(slider: Locator, value: string) {
  await slider.evaluate((node, next) => {
    (node as HTMLInputElement).value = next;
    node.dispatchEvent(new Event('input', { bubbles: true }));
    node.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

test('Pages compatibility preserves external URLs and serializes portable scene links', () => {
  expect(resolvePagesURL('/assets/model.glb?v=1', '/actionforge/', 'https://example.com'))
    .toBe('https://example.com/actionforge/assets/model.glb?v=1');
  expect(resolvePagesURL('https://external.com/assets/model.glb', '/actionforge/', 'https://example.com'))
    .toBe('https://external.com/assets/model.glb');
  expect(resolvePagesURL('/actionforge/assets/model.glb', '/actionforge/', 'https://example.com'))
    .toBe('/actionforge/assets/model.glb');
  expect(createShareURL('m=1&a=head:20', 'walk_loop', 'https://example.com/actionforge/'))
    .toBe('https://example.com/actionforge/#m=1&a=head:20&clip=walk_loop');
});

test('all recovered files retain their original bytes', async () => {
  const inventory = JSON.parse(await readFile('public/recovery-inventory.json', 'utf8'));
  expect(inventory.unavailable).toEqual([]);
  for (const file of inventory.files) {
    const data = await readFile(`public/${file.path}`);
    expect(createHash('sha256').update(data).digest('hex'), file.path).toBe(file.sha256);
  }
});

test('renders original workspace without browser errors or broken resources', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await openWorkspace(page);
  await expect(page.locator('#lib-title')).toHaveText('Idle Loop');
  await expect(page.locator('#lib-stage canvas')).toBeVisible();
  await expect(page.locator('#lib-grid .lib-tile')).toHaveCount(85);
  await expect(page.locator('.af-mark')).toContainText('ActionForge');
  await page.locator('#lib-playpause').click();
  const time = await page.locator('#lib-time').innerText();
  await page.waitForTimeout(300);
  await expect(page.locator('#lib-time')).toHaveText(time);
  expect(errors).toEqual([]);
});

test('search, tags, category grouping and clip selection work', async ({ page }) => {
  await openWorkspace(page);
  await page.locator('#lib-search').fill('walk');
  await expect(page.locator('#lib-count')).not.toHaveText('85 clips');
  await page.locator('.lib-tile[data-id="walk_loop"]').click();
  await expect(page.locator('#lib-title')).toHaveText('Walk Loop');
  await page.locator('#lib-search').fill('');
  await page.locator('#lib-group').check();
  await expect(page.locator('#lib-group')).toBeChecked();
  await page.locator('#lib-chips').getByRole('button', { name: /combat/i }).click();
  await expect(page.locator('#lib-count')).toHaveText('20 of 85 clips');
});

test('display controls, playback speed, mirror and reverse update state', async ({ page }) => {
  await openWorkspace(page);
  await page.locator('#lib-search').fill('walk loop');
  await page.locator('.lib-tile[data-id="walk_loop"]').click();
  for (const id of ['lib-skeleton', 'lib-wireframe', 'lib-mirror', 'lib-reverse', 'lib-inplace-view']) {
    await page.locator(`#${id}`).click();
    await expect(page.locator(`#${id}`)).toHaveClass(/is-on/);
  }
  await page.locator('#lib-speed').selectOption('0.5');
  await expect(page.locator('#lib-speed')).toHaveValue('0.5');
  await page.locator('#lib-shade-grey').click();
  await expect(page.locator('#lib-shade-grey')).toHaveAttribute('aria-pressed', 'true');
});

test('all eleven tool panels, pose and character libraries open', async ({ page }) => {
  await openWorkspace(page);
  for (const tool of ['camera', 'stage', 'compose', 'adjust', 'props', 'ik', 'pose', 'picker', 'import', 'presets']) {
    await page.locator(`button[data-tool="${tool}"]`).click();
    await expect(page.locator(`.lib-toolpane[data-tool="${tool}"]`)).toBeVisible();
  }
  await page.locator('#lib-tab-poses').click();
  await expect(page.locator('#lib-poses')).toBeVisible();
  await page.locator('#lib-tab-chars').click();
  await expect(page.locator('#lib-chargrid')).toContainText('Mannequin');
});

test('adjustments support undo, redo and reset', async ({ page }) => {
  await openWorkspace(page);
  await page.locator('button[data-tool="adjust"]').click();
  const slider = page.getByRole('slider', { name: 'Posture', exact: true });
  await setRange(slider, '25');
  await expect(page.locator('#lib-adjust')).toContainText('25°');
  await expect(page.locator('#lib-undo')).toBeEnabled();
  await page.locator('#lib-undo').click();
  await expect(slider).toHaveValue('0');
  await page.locator('#lib-redo').click();
  await expect(slider).toHaveValue('25');
  await page.locator('#lib-adjust').getByRole('button', { name: 'Reset all' }).click();
  await expect(slider).toHaveValue('0');
});

test('exports a valid GLB and FBX from the current clip', async ({ page }) => {
  await openWorkspace(page);
  for (const format of ['glb', 'fbx']) {
    await page.locator('#lib-bundle-format').selectOption(format);
    const result = page.waitForEvent('download');
    await page.locator('#lib-bundle-go').click();
    const download = await result;
    expect(download.suggestedFilename()).toMatch(new RegExp(`\\.${format}$`));
    const data = await bytes(download);
    expect(data.length).toBeGreaterThan(10000);
    expect(data.subarray(0, format === 'glb' ? 4 : 18).toString())
      .toBe(format === 'glb' ? 'glTF' : 'Kaydara FBX Binary');
  }
});

test('bundles selected clips into a ZIP and composes body regions', async ({ page }) => {
  await openWorkspace(page);
  for (const id of ['walk_loop', 'idle_loop']) {
    const pick = page.locator(`.lib-tile[data-id="${id}"] .lib-tile__pick`);
    await pick.focus();
    await pick.press('Space');
    await expect(pick).toHaveAttribute('aria-checked', 'true');
  }
  await expect(page.locator('#lib-bundle-count')).toContainText('2');
  await page.locator('#lib-split').check();
  const result = page.waitForEvent('download');
  await page.locator('#lib-bundle-go').click();
  const download = await result;
  expect(download.suggestedFilename()).toMatch(/\.zip$/);
  expect((await bytes(download)).subarray(0, 2).toString()).toBe('PK');
  await page.locator('button[data-tool="compose"]').click();
  await page.locator('#lib-composer').getByRole('button', { name: '+ Add selected' }).click();
  await expect(page.locator('#lib-composer')).toContainText('Walk Loop');
  await expect(page.locator('#lib-composer')).toContainText('Idle Loop');
});

test('engine skeletons and the Blender template are available', async ({ page }) => {
  await openWorkspace(page);
  for (const skeleton of ['ue5', 'ue4', 'mixamo', 'reallusion']) {
    await page.locator('#lib-bundle-skeleton').selectOption(skeleton);
    const format = await page.locator('#lib-bundle-format').inputValue();
    const result = page.waitForEvent('download');
    await page.locator('#lib-bundle-go').click();
    const data = await bytes(await result);
    expect(data.subarray(0, 4).toString()).toBe(format === 'glb' ? 'glTF' : 'Kayd');
  }
  await page.locator('#lib-rig-panel summary').click();
  const result = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Skeleton template (.blend)' }).click();
  const template = await bytes(await result);
  const uncompressed = template.readUInt32LE(0) === 0xfd2fb528 ? zstdDecompressSync(template) : template;
  expect(uncompressed.subarray(0, 7).toString()).toBe('BLENDER');
});

test('imports a local animation and can save and reopen a project', async ({ page }) => {
  await openWorkspace(page);
  await page.locator('button[data-tool="import"]').click();
  const chooser = page.waitForEvent('filechooser');
  await page.locator('#lib-import-panel').getByRole('button', { name: '+ Add animation' }).click();
  await (await chooser).setFiles('public/assets/animation-library/animations/dance_loop.glb');
  await expect(page.locator('#lib-import-panel')).toContainText('dance_loop');
  await page.locator('button[data-tool="presets"]').click();
  page.once('dialog', dialog => dialog.accept('Recovered scene'));
  await page.locator('#lib-presets-panel').getByRole('button', { name: 'Save as…', exact: true }).click();
  await expect(page.locator('#lib-presets-panel')).toContainText('Recovered scene');
  const result = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download this scene as an .actionforge file' }).click();
  const data = await bytes(await result);
  expect(data.length).toBeGreaterThan(10);
  await page.reload();
  await expect(page.locator('#lib-count')).toContainText('clips');
  await page.locator('button[data-tool="presets"]').click();
  await expect(page.locator('#lib-presets-panel')).toContainText('Recovered scene');
});

test('share links restore the selected animation and adjustments without a backend', async ({ page, browser }) => {
  await openWorkspace(page);
  await page.locator('#lib-search').fill('walk loop');
  await page.locator('.lib-tile[data-id="walk_loop"]').click();
  await page.locator('button[data-tool="adjust"]').click();
  await setRange(page.getByRole('slider', { name: 'Posture', exact: true }), '25');
  await page.locator('#lib-share').click();
  const urlInput = page.locator('.lib-sharepop__url');
  await expect(urlInput).toBeVisible();
  const url = await urlInput.inputValue();
  expect(url).toContain('/actionforge/#');
  expect(url).toContain('clip=walk_loop');
  const otherContext = await browser.newContext();
  const other = await otherContext.newPage();
  await other.addInitScript(() => {
    document.addEventListener('af:ready', () => { document.documentElement.dataset.afReady = 'true'; });
  });
  await other.goto(url);
  await expect(other.locator('html')).toHaveAttribute('data-af-ready', 'true');
  await expect(other.locator('#lib-title')).toHaveText('Walk Loop');
  await other.locator('button[data-tool="adjust"]').click();
  await expect(other.getByRole('slider', { name: 'Posture', exact: true })).toHaveValue('25');
  await otherContext.close();
});

test('FAQ, news and support content are available locally', async ({ page }) => {
  await openWorkspace(page);
  for (const id of ['af-faq', 'af-news', 'af-support']) {
    await page.locator(`#${id}`).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.goto('support.html');
  await expect(page.locator('#af-support-here')).toContainText('ActionForge is free.');
  await expect(page.locator('#af-support-here')).not.toContainText('Loading…');
});

test('Motion Lab edits gait, generates eight directions, and exports', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('motion-lab.html');
  await expect(page.locator('#status')).not.toHaveText('Loading…');
  await expect(page.locator('#stage')).toBeVisible();
  await page.locator('#gaitPreset').selectOption('Brisk');
  await page.locator('#generate').click();
  await expect(page.locator('#results')).toContainText('made');
  await page.locator('details').filter({ has: page.locator('#exGo') }).locator('summary').click();
  await expect(page.locator('#exGo')).toBeEnabled();
  const result = page.waitForEvent('download');
  await page.locator('#exGo').click();
  const download = await result;
  expect((await bytes(download)).length).toBeGreaterThan(10000);
  expect(errors).toEqual([]);
});

test('service worker keeps the entire library available offline after reload', async ({ page, context }) => {
  await openWorkspace(page);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect(page.locator('#lib-title')).toHaveText('Idle Loop');
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await page.locator('button[data-tool="presets"]').click();
  await page.getByRole('button', { name: 'Fetch the whole library', exact: true }).click();
  await page.waitForFunction(async () => {
    const library = await caches.open('af-library');
    return (await library.keys()).length >= 285;
  }, undefined, { timeout: 60000 });
  await context.setOffline(true);
  try {
    await page.reload();
    await expect(page.locator('#lib-count')).toHaveText('85 clips');
    await expect(page.locator('#lib-title')).toHaveText('Idle Loop');
    await expect(page.locator('#lib-stage canvas')).toBeVisible();
    await page.locator('#lib-search').fill('sword regular combo');
    await page.locator('.lib-tile[data-id="sword_regular_combo"]').click();
    await expect(page.locator('#lib-title')).toHaveText('Sword Regular Combo');
  } finally {
    await context.setOffline(false);
  }
});
