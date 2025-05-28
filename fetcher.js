const axios = require('axios');
const { saveTextToFile } = require('./utils');

// Список источников — сюда добавляй реальные дампы
const SOURCES = [
  'https://pastebin.com/raw/FTJNbpuA',
  'https://rentry.org/raw/random',
  'https://controlc.com/abcdef/raw' // Пример, нужно реальный ID
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
