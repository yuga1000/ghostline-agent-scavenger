const axios = require('axios');

const BASE_URL = 'https://archive.org/advancedsearch.php';
const QUERY = 'ethereum private key';
const FIELDS = ['identifier'];
const ROWS = 50;

async function fetchPasteLinks() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: QUERY,
        fl: FIELDS.join(','),
        rows: ROWS,
        output: 'json'
      }
    });

    const docs = response.data?.response?.docs || [];
    const links = docs.map(doc => `https://archive.org/details/${doc.identifier}`);
    return links;
  } catch (err) {
    console.error('❌ Ошибка при получении дампов с archive.org:', err.message);
    return [];
  }
}

module.exports = { fetchPasteLinks };
