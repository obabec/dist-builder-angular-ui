import { test, expect } from '@playwright/test';


test('test-empty-distribution', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/intro');
  await page.getByRole('link', { name: 'Builder', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Create distribution' }).click();
  const emptySum = '6a8c833ef6d8b0c943c1295016e2d6ed';
  const md5File = require('md5-file');
  md5File(await (await downloadPromise).path()).then((hash) => {
    expect(hash).toEqual(emptySum);
  })
});