 const axios = require('axios');
const { parseDumpAndScan } = require('./parser');
const { saveTextToFile } = require('./utils');

// URL публичной ленты Pastebin (через сторонний сервис, Pastebin API платный)
const FEED_URL = 'https://scrape.pastebin.com/api_scraping.php?limit=10';

async function fetchAndProcessDumps() {
  try {
    const { data } = await axios.get(FEED_URL);
    if (!Array.isArray(data)) return;

    for (const paste of data) {
      const url = paste.scrape_url;
      try {
        const response = await axios.get(url);
        const text = response.data;

        // сохраняем локально (для логов или повторного анализа)
        await saveTextToFile(`dump-${Date.now()}.txt`, text);

        // запускаем парсер
        parseDumpAndScan(text);
      } catch (err) {
        console.error('Ошибка загрузки паста:', err.message);
      }
    }
  } catch (err) {
    console.error('Ошибка получения фида Pastebin:', err.message);
  }
}

// экспортируем как функцию для вызова из index.js
module.exports = { fetchAndProcessDumps };
