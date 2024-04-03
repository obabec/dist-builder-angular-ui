import { test, expect } from '@playwright/test';

test('test-full-configuration', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/intro');
    await page.getByRole('link', { name: 'Builder', exact: true }).click();
    let select = page.locator('#mainForm form').locator('#sourceNode');
    await select.selectOption("Oracle");
    await page.locator('#debeziumVersion').fill('2.6.0.Final1');
    
    await page.locator('#sourceNode-Oracle #databaseDbname').fill("oracleNodeOneHostname");
    await page.locator('#sourceNode-Oracle #schemaIncludeList').fill("schema1,schema2,schema3");

    await page.locator('#sourceNode-Oracle-logMiningConfig #strategy').selectOption('ONLINE_CATALOG');
    await page.locator('#sourceNode-Oracle-logMiningConfig #bufferType').selectOption('MEMORY');

    await page.locator('#sourceNode-Oracle-schemaHistoryInternalConfig-button').click();

    await page.locator('#sourceNode-Oracle #databaseExcludeList').fill("eDtb1,eDtb2");
    
    await page.locator('#sourceNode-Oracle-signalConfiguration #topic').fill("signalTopic");
    await page.locator('#sourceNode-Oracle-signalConfiguration #pollTimeoutMs').fill("300");
    
    await page.locator('#mainForm form').filter({ hasText: 'PubSubLitePravegaPubSubPulsarNatsJetSteaming' }).locator('#sinkNode').selectOption("Redis");

    await page.locator('#sinkNode-Redis #redisAddress').fill("test-redis:8080");
    await page.locator('#sinkNode-Redis #redisWaitEnabled').setChecked(true);
    await page.locator('#internalSchemaHistory-storageConfig #storageConfig').selectOption('FileStorage');
    await page.locator('#internalSchemaHistory-storageConfig-FileStorage #fileFilename').fill('testfile.txt');

    await page.locator('#schemaHistoryClass').fill('io.debezium.storage.file.history.FileSchemaHistory');

    await page.locator('#offsetStorage-button').click();
    await page.locator('#offsetStorage-button').click();
    await page.getByLabel('Group ID').nth(0).fill("io.apache");
    await page.locator('#dependencyList').getByLabel('Version').nth(0).fill("3.6.0");
    await page.locator('#dependencyList').getByTestId('artifactId').nth(0).fill("kafka");
    await page.locator('#dependencyList').getByLabel('Comment').nth(0).fill("Kafka dependency");
    
    await page.getByLabel('Group ID').nth(1).fill("io.debezium");
    await page.locator('#dependencyList').getByLabel('Version').nth(1).fill("3.5.2.Alpha1");
    await page.locator('#dependencyList').getByTestId('artifactId').nth(1).fill("debezium-mongo-connector");
    await page.locator('#dependencyList').getByLabel('Comment').nth(1).fill("Mongo Dependency");
    
    await page.getByRole('button', { name: 'Create distribution' }).click();
  
    const download = await page.waitForEvent('download');
    
    const emptySum = '43b1c6e108f324ca2acf8f545559f7a2';
    const md5File = require('md5-file');
    md5File(await download.path()).then((hash) => {
      expect(hash).toEqual(emptySum);
    })
});