const axios = require('axios');
const { saveTextToFile } = require('./utils');

// Список источников — сюда добавляй реальные дампы
const SOURCES = [
  'https://pastebin.com/raw/VALID_ID_1',
  'https://pastebin.com/raw/VALID_ID_2'
];

async function fetchAndStoreDumps() {
  for (const url of SOURCES) {
    try {
      const response = await axios.get(url);
      const content = response.data;

      const filename = url.split('/').pop() + '.txt'; // имя файла на основе URL
      await saveTextToFile(filename, content);

      console.log(`✅ Загружено и сохранено: ${filename}`);
    } catch (error) {
      console.error(`❌ Ошибка при загрузке ${url}:`, error.message);
    }
  }
}

module.exports = { fetchAndStoreDumps };
const { fetchPasteContent } = require('./fetchPastebin');
const { extractKeys } = require('./parser');
const { sendToTelegram } = require('./telegram');

async function processLinks(links) {
  for (const url of links) {
    try {
      const content = await fetchPasteContent(url);
      const found = extractKeys(content);
      if (found.length > 0) {
        await sendToTelegram(found.join('\n'), `🔐 Новый дамп: ${url}`);
      }
    } catch (err) {
      console.error(`Ошибка при обработке ${url}:`, err.message);
    }
  }
}

module.exports = {
  fetchAndStoreDumps,
  processLinks
};
