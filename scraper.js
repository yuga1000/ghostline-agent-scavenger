const axios = require('axios');
const cheerio = require('cheerio');

// Здесь можно указать клоны pastebin или другие источники
const SOURCES = [
  'https://controlc.com/',
  'https://rentry.org/',
];

async function fetchPasteLinks() {
  const links = [];

  for (const base of SOURCES) {
    try {
      console.log(`🌐 Парсинг источника: ${base}`);
      const response = await axios.get(base);
      const $ = cheerio.load(response.data);

      // Примерный шаблон — нужно адаптировать под конкретный HTML
      $('a').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.match(/\/[a-zA-Z0-9]{5,}/)) {
          const fullUrl = href.startsWith('http') ? href : base + href;
          links.push(fullUrl);
        }
      });
    } catch (err) {
      console.warn(`⚠️ Ошибка парсинга ${base}: ${err.message}`);
    }
  }

  return links;
}

module.exports = { fetchPasteLinks };
