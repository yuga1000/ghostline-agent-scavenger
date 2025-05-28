const axios = require('axios');
const { saveTextToFile } = require('./utils');

// Пример источника (можно заменить на другой pastebin-клон)
const SOURCES = [
  'https://pastebin.com/raw/someExampleDump', // ← поменяй на реальные URL
];

async function fetchAndStoreDumps() {
  for (const url of SOURCES) {
    try {
      const response = await axios.get(url);
      const content = response.data;
      const fileName = `dump-${Date.now()}.txt`;
      saveTextToFile(fileName, content);
      console.log(`✅ Saved dump from ${url} as ${fileName}`);
    } catch (err) {
      console.warn(`⚠️ Failed to fetch ${url}: ${err.message}`);
    }
  }
}

module.exports = { fetchAndStoreDumps };
