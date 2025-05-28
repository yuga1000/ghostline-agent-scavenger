const axios = require('axios');

async function fetchPasteLinks() {
  const searchUrl = 'https://archive.org/advancedsearch.php?q=ethereum+private+key&fl[]=identifier&rows=50&page=1&output=json';

  try {
    const response = await axios.get(searchUrl);
    const docs = response.data?.response?.docs || [];
    const links = docs.map(doc => `https://archive.org/details/${doc.identifier}`);
    return links;
  } catch (err) {
    console.error('❌ Ошибка при получении дампов с archive.org:', err.message);
    return [];
  }
}

module.exports = { fetchPasteLinks };
