const { fetchAndStoreDumps } = require('./fetcher');
const { extractFromAllFiles } = require('./extractor');

async function main() {
  await fetchAndStoreDumps();

  const keys = extractFromAllFiles();
  if (keys.length > 0) {
    console.log(`✨ Найдено всего ключей: ${keys.length}`);
    for (const key of keys) {
      console.log(`🧷 ${key}`);
    }
  } else {
    console.log('🕳️ Ключи не найдены.');
  }
}

main();
