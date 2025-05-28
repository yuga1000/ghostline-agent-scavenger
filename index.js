const { fetchAndStoreDumps } = require('./fetcher');
const { extractFromAllFiles } = require('./extractor');
const { sendTelegramMessage } = require('./telegram');

async function main() {
  await fetchAndStoreDumps();

  const keys = extractFromAllFiles();
  if (keys.length > 0) {
    console.log(`🔑 Найдено всего ключей: ${keys.length}`);
    for (const key of keys) {
      console.log(`> ${key}`);
    }
    await sendTelegramMessage(`✅ Найдено ключей: ${keys.length}`);
  } else {
    console.log('⚠️ Ключи не найдены.');
    await sendTelegramMessage('⚠️ Ключи не найдены.');
  }
}

main();
