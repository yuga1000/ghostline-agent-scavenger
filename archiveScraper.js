const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArchiveDumps() {
  const searchUrl = 'https://archive.org/advancedsearch.php?q=private+key+dump&fl[]=identifier&rows=20&page=1&output=json';

  try {
    const response = await axios.get(searchUrl);
    const docs = response.data.response.docs;

    const links = docs.map(doc => `https://archive.org/download/${doc.identifier}`);
    return links;
  } catch (error) {
    console.error('❌ Ошибка при получении списка с archive.org:', error.message);
    return [];
  }
}

module.exports = { fetchArchiveDumps };
