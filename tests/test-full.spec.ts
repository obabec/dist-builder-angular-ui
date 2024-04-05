import { test, expect } from '@playwright/test';

test('test-full-spec', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/intro');
    await page.getByRole('link', { name: 'Builder', exact: true }).click();
    let select = page.locator('#mainForm form').locator('#sourceNode');
    await select.selectOption("Mysql");
    await page.locator('#debeziumVersion').fill('2.6.0.Final1');
    
    await page.locator('#sourceNode-Mysql #databaseServerId').fill("123465");
    await page.locator('#sourceNode-Mysql #includeQuery').setChecked(true);

    await page.locator('#sourceNode-Mysql #inconsistentSchemaHandlingMode').selectOption('FAIL');

    await page.locator('#sourceNode-Mysql-schemaHistoryInternalConfig-button').click();


    await page.locator('#sourceNode-Mysql #databaseHostname').fill("mysql-hostname");
    await page.locator('#sourceNode-Mysql #databasePort').fill("3533");

    await page.locator('#sourceNode-Mysql-signalConfiguration-button').click();
    
    await page.locator('#mainForm form').filter({ hasText: 'PubSubLitePravegaPubSubPulsarNatsJetSteaming' }).locator('#sinkNode').selectOption("RabbitMQ");

    await page.locator('#sinkNode-RabbitMQ #rabbitmqConnectionHost').fill("test-rabbiit:84615");
    await page.locator('#sinkNode-RabbitMQ #rabbitmqAckTimeout').fill('12841');
    await page.locator('#internalSchemaHistory-storageConfig #storageConfig').selectOption('RedisStorageConfig');
    await page.locator('#internalSchemaHistory-storageConfig-RedisStorageConfig #address').fill('test address redis');
    await page.locator('#internalSchemaHistory-storageConfig-RedisStorageConfig #user').fill('userName');
    await page.locator('#internalSchemaHistory-storageConfig-RedisStorageConfig #waitEnabled').setChecked(true);

    await page.locator('#schemaHistoryClass').fill('io.debezium.storage.redis.history.RedisSchemaHistory');

    await page.locator('#offsetStorage-button').click();
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
    
    await page.getByLabel('Group ID').nth(2).fill("io.skodjob");
    await page.locator('#dependencyList').getByLabel('Version').nth(2).fill("0.0.1-Alpha1");
    await page.locator('#dependencyList').getByTestId('artifactId').nth(2).fill("test-frame");
    await page.locator('#dependencyList').getByLabel('Comment').nth(2).fill("Test frame");

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#truststore').click();
    const fileChooser = await fileChooserPromise;
    var path = require('path');
    await fileChooser.setFiles(path.join(__dirname, 'resources/truststore.jks'));


    const keystorePromise = page.waitForEvent('filechooser');
    await page.locator('#keystore').click();
    const keystore = await keystorePromise;
    var path = require('path');
    await keystore.setFiles(path.join(__dirname, 'resources/keystore.jks'));

    await page.getByRole('button', { name: 'Create distribution' }).click();
  
    const download = await page.waitForEvent('download');
    
    const emptySum = '453d2816751f85db183e45d044412758';
    const md5File = require('md5-file');
    md5File(await download.path()).then((hash) => {
      expect(hash).toEqual(emptySum);
    })
});