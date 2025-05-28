const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://archive.org';
const SEARCH_URL = `${BASE_URL}/details?and[]=subject%3A%22wallet+dump%22&sin=&sort=-date`;

async function fetchArchiveDumps() {
  try {
    const { data } = await axios.get(SEARCH_URL);
    const $ = cheerio.load(data);
    const links = [];

    $('a[href^="/details/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !href.includes('/details/anonymous') && !href.includes('/details/software')) {
        links.push(BASE_URL + href);
      }
    });

    return [...new Set(links)];
  } catch (error) {
    console.error('Ошибка при получении дампов с archive.org:', error.message);
    return [];
  }
}

module.exports = { fetchArchiveDumps };
