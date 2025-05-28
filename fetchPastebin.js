// fetchPastebin.js
const axios = require('axios');

const PASTE_EE_LATEST = 'https://paste.ee/latest';

async function fetchRecentPastes() {
  try {
    const res = await axios.get(PASTE_EE_LATEST);
    const body = res.data;

    const pasteUrls = [...body.matchAll(/href="(\/p\/[a-zA-Z0-9]+)"/g)].map(m => `https://paste.ee${m[1]}`);
    return pasteUrls.slice(0, 5); // берём только 5 последних
  } catch (err) {
    console.error('Ошибка при получении paste.ee:', err.message);
    return [];
  }
}

async function fetchPasteContent(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`Ошибка при загрузке ${url}:`, err.message);
    return '';
  }
}

module.exports = {
  fetchRecentPastes,
  fetchPasteContent,
};
