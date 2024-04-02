import { test, expect } from '@playwright/test';

test('test-full-configuration', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/intro');
    await page.getByRole('link', { name: 'Builder', exact: true }).click();
    let select = page.locator('#mainForm form').locator('#sourceNode');
    await select.selectOption("Mongo");
    await page.screenshot({ path: 'screenshot.png' });
    await page.locator('#mongodbConnectionString').fill("test-mongo:7463");
    await page.locator('#mongodbConnectionMode').selectOption('REPLICA_SET');
    await page.locator('#debeziumVersion').fill('2.5.0.Alpha1');
    await page.locator('#sourceNode-Mongo #retriableRestartConnectorWaitMs').fill('5');
    await page.locator('#mongodbSslEnabled').setChecked(true);
    await page.locator('#sourceNode-Mongo-signalConfiguration-button').click();
  
    await page.locator('#mainForm form').filter({ hasText: 'PubSubLitePravegaPubSubPulsarNatsJetSteaming' }).locator('#sinkNode').selectOption("Http");
    await page.locator('#httpUrl').fill("test-http:8080");
    await page.locator('#httpRetries').fill('10');
  
    await page.locator('#schemaHistoryClass').fill('io.debezium.storage.kafka.history.KafkaSchemaHistory');
    await page.locator('#internalSchemaHistory #skipUnparseableDdl').setChecked(true);
    await page.locator('#storageConfig').selectOption('KafkaStorageConfig');
    await page.locator('#internalSchemaHistory-storageConfig-KafkaStorageConfig #topic').fill('test-topic');
    await page.getByRole('button', { name: 'Create distribution' }).click();
  
    const downloadPromise = page.waitForEvent('download');
    
    const emptySum = 'f501f3db291dc6341087f56cebe49192';
    const md5File = require('md5-file');
    md5File(await (await downloadPromise).path()).then((hash) => {
      expect(hash).toEqual(emptySum);
    })
});