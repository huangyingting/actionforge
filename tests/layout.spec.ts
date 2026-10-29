import { expect, test, type Page } from '@playwright/test';

async function openEditor(page: Page) {
  await page.addInitScript(() =>
    document.addEventListener('af:ready', () => {
      document.documentElement.dataset.afReady = 'true';
    }),
  );
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-af-ready', 'true');
}
async function bounds(page: Page, selector: string) {
  const box = await page.locator(selector).boundingBox();
  expect(box).toBeTruthy();
  return box!;
}
async function menuAction(page: Page, name: string) {
  await page.locator('.workspace-layout-menu > summary').click();
  await page.getByRole('button', { name, exact: true }).click();
}

test('1920×1080 timeline never reduces side panel height or overlaps the inspector', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openEditor(page);
  const resources = await bounds(page, '.lib-panel');
  const inspector = await bounds(page, '.lib-left');
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  await expect(page.locator('#lib-seq')).toBeVisible();
  expect(await bounds(page, '.lib-panel')).toEqual(resources);
  expect(await bounds(page, '.lib-left')).toEqual(inspector);
  const stage = await bounds(page, '.lib-stage');
  const sequence = await bounds(page, '#lib-seq');
  expect(stage.width).toBeGreaterThan(1200);
  expect(stage.height).toBeGreaterThan(500);
  expect(sequence.x).toBe(stage.x);
  expect(sequence.width).toBe(stage.width);
  expect(sequence.x).toBeGreaterThanOrEqual(resources.x + resources.width);
  expect(sequence.x + sequence.width).toBeLessThanOrEqual(inspector.x);
  const grip = page.getByRole('separator', { name: 'Timeline height' });
  await grip.focus();
  await grip.press('ArrowUp');
  expect((await bounds(page, '#lib-seq')).height).toBeGreaterThan(
    sequence.height,
  );
  expect(await bounds(page, '.lib-left')).toEqual(inspector);
  expect(await bounds(page, '.lib-panel')).toEqual(resources);
  await page
    .locator('#lib-seq')
    .getByRole('button', { name: 'Graph', exact: true })
    .click();
  await expect(page.locator('.lib-seq__graph')).toBeVisible();
  expect(await bounds(page, '.lib-left')).toEqual(inspector);
  await page.locator('button[data-tool="adjust"]').click();
  const posture = page.getByRole('slider', { name: 'Posture', exact: true });
  await expect(posture).toBeVisible();
  expect((await posture.boundingBox())!.height).toBeGreaterThanOrEqual(24);
  expect(
    await page
      .locator('.lib-adj__label')
      .first()
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(13);
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  expect(await bounds(page, '.lib-left')).toEqual(inspector);
  expect(await bounds(page, '.lib-panel')).toEqual(resources);
});

test('panel resizing, compact resources and focus layouts persist and restore predictably', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openEditor(page);
  const resourcesGrip = page.getByRole('separator', {
    name: 'Resources width',
  });
  await resourcesGrip.focus();
  await resourcesGrip.press('ArrowRight');
  await expect
    .poll(async () => (await bounds(page, '.lib-panel')).width)
    .toBe(316);
  const inspectorGrip = await bounds(page, '.workspace-divider--inspector');
  await page.mouse.move(inspectorGrip.x + 3, inspectorGrip.y + 100);
  await page.mouse.down();
  await page.mouse.move(inspectorGrip.x - 37, inspectorGrip.y + 100);
  await page.mouse.up();
  await expect
    .poll(async () => (await bounds(page, '.lib-left')).width)
    .toBe(360);
  await page.getByRole('button', { name: 'Compact list', exact: true }).click();
  await expect(page.locator('.lib-panel')).toHaveAttribute('data-view', 'list');
  expect(
    (await bounds(page, '#lib-grid .lib-tile__media >> nth=0')).height,
  ).toBeLessThan(60);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-af-ready', 'true');
  expect((await bounds(page, '.lib-panel')).width).toBe(316);
  expect((await bounds(page, '.lib-left')).width).toBe(360);
  await expect(page.locator('.lib-panel')).toHaveAttribute('data-view', 'list');
  await page.getByRole('button', { name: 'Inspector', exact: true }).click();
  await expect(page.locator('.lib-left')).toBeHidden();
  await page.locator('button[data-tool="pose"]').click();
  await expect(page.locator('.lib-left')).toBeVisible();
  await expect(page.locator('.lib-toolpane:visible')).toHaveCount(1);
  await menuAction(page, 'Focus preview');
  await expect(page.locator('.lib-panel')).toBeHidden();
  await expect(page.locator('.lib-left')).toBeHidden();
  expect((await bounds(page, '.lib-stage')).width).toBe(1920);
  await page.getByRole('button', { name: 'Back to editor' }).click();
  expect((await bounds(page, '.lib-panel')).width).toBe(316);
  await menuAction(page, 'Maximize timeline');
  await expect(page.locator('#lib-seq')).toBeVisible();
  expect((await bounds(page, '#lib-seq')).height).toBeGreaterThan(850);
  await expect(page.locator('.lib-stage')).toBeHidden();
  await page.getByRole('button', { name: 'Back to editor' }).click();
  await menuAction(page, 'Reset layout');
  expect((await bounds(page, '.lib-panel')).width).toBe(300);
  expect((await bounds(page, '.lib-left')).width).toBe(320);
  expect((await bounds(page, '#lib-seq')).height).toBe(280);
});

test('export is an independent keyboard-contained dialog even with Resources collapsed', async ({
  page,
}) => {
  await openEditor(page);
  await expect(page.locator('#lib-bundle')).toBeHidden();
  await page.getByRole('button', { name: 'Resources', exact: true }).click();
  const exportButton = page.getByRole('button', {
    name: 'Export',
    exact: true,
  });
  await exportButton.click();
  const dialog = page.getByRole('dialog', { name: 'Export animation' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('#lib-bundle-go')).toBeEnabled();
  await page.getByRole('button', { name: 'Close export' }).focus();
  await page.keyboard.press('Shift+Tab');
  expect(
    await page.evaluate(
      () => !!document.activeElement?.closest('#workspace-export'),
    ),
  ).toBe(true);
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'Close export' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(exportButton).toBeFocused();
  await page.getByRole('button', { name: 'Resources', exact: true }).click();
  const saveAnimation = page.getByRole('button', {
    name: 'Save to my animations',
    exact: true,
  });
  await saveAnimation.click();
  const saveDialog = page.getByRole('dialog', {
    name: 'Save to my animations',
  });
  await expect(saveDialog).toBeVisible();
  await expect(saveDialog.getByRole('textbox')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(saveAnimation).toBeFocused();
});

test('header project save reports committed state and unsaved edits', async ({
  page,
}) => {
  await openEditor(page);
  page.once('dialog', (dialog) => dialog.accept('Redesigned workspace'));
  await page.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(page.locator('.workspace-project-status')).toHaveText(
    'Saved locally',
  );
  await page.locator('button[data-tool="adjust"]').click();
  await page
    .getByRole('slider', { name: 'Posture', exact: true })
    .evaluate((input) => {
      (input as HTMLInputElement).value = '25';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  await expect(page.locator('.workspace-project-status')).toHaveText(
    'Unsaved changes',
  );
  await page.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(page.locator('.workspace-project-status')).toHaveText(
    'Saved locally',
  );
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (value, key) {
      const request = put.call(this, value, key);
      request.addEventListener('success', () => this.transaction.abort());
      IDBObjectStore.prototype.put = put;
      return request;
    };
  });
  await page.getByRole('button', { name: 'Save project', exact: true }).click();
  await expect(page.locator('.workspace-status')).toContainText(
    'Could not save',
  );
});

test('dragging a resource starts a timeline without moving either side panel', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openEditor(page);
  const resources = await bounds(page, '.lib-panel');
  const inspector = await bounds(page, '.lib-left');
  await page.locator('#lib-search').fill('walk loop');
  const source = await bounds(
    page,
    '.lib-tile[data-id="walk_loop"] .lib-tile__name',
  );
  await page.mouse.move(source.x + 20, source.y + 8);
  await page.mouse.down();
  await page.mouse.move(source.x + 60, source.y + 18, { steps: 10 });
  await expect(page.locator('#lib-seq')).toBeVisible();
  const target = await bounds(
    page,
    '.lib-seq__row[data-drop] .lib-seq__lane >> nth=0',
  );
  await page.mouse.move(target.x + 50, target.y + 20, { steps: 20 });
  await page.mouse.up();
  await expect(page.locator('#lib-seq')).toContainText('Walk Loop');
  expect(await bounds(page, '.lib-panel')).toEqual(resources);
  expect(await bounds(page, '.lib-left')).toEqual(inspector);
});

test('desktop and narrow layouts keep panels and timeline reachable without page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await openEditor(page);
  await page.getByRole('button', { name: 'Timeline', exact: true }).click();
  for (const [width, height] of [
    [1280, 720],
    [1440, 900],
    [1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    expect(
      await page.locator('.af-bar').evaluate((element) => element.scrollWidth),
    ).toBe(width);
    expect((await bounds(page, '.lib-stage')).width).toBeGreaterThanOrEqual(
      640,
    );
    for (const selector of ['.lib-left', '.lib-panel', '#lib-seq']) {
      const box = await bounds(page, selector);
      expect(box.y + box.height).toBeLessThanOrEqual(height);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await menuAction(page, 'Reset layout');
  await expect(page.locator('.lib-left')).toBeHidden();
  await expect(page.locator('.lib-panel')).toBeHidden();
  await page.getByRole('button', { name: 'Resources', exact: true }).click();
  await expect(page.locator('#lib-search')).toBeVisible();
  await page.locator('#lib-search').fill('walk loop');
  await page.locator('.lib-tile[data-id="walk_loop"]').click();
  await expect(page.locator('#lib-title')).toHaveText('Walk Loop');
  await page.getByRole('button', { name: 'Inspector', exact: true }).click();
  await expect(page.locator('.lib-panel')).toBeHidden();
  await expect(page.locator('.lib-left')).toBeVisible();
  await page.getByRole('button', { name: 'Inspector', exact: true }).click();
  await expect(page.locator('.lib-left')).toBeHidden();
  expect((await bounds(page, '.lib-stage')).width).toBe(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  await menuAction(page, 'Maximize timeline');
  await expect(page.locator('#lib-seq')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Back to editor' }),
  ).toBeVisible();
});
