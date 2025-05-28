require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const BOT_TOKEN = process.env.TG_TOKEN;
const CHAT_ID = process.env.TG_CHAT_ID;

const pastedUrls = new Set();

async function sendToTelegram(message, prefix = '⚠️ Найдено') {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `${prefix}:\n\n${message}`,
    });
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err.message);
  }
}

function extractKeys(text) {
  const lines = text.split('\n');
  return lines.filter(line =>
    /0x[a-fA-F0-9]{64}/.test(line) || /private/i.test(line) || /seed/i.test(line)
  );
}

async function fetchRecentPastes() {
  try {
    const res = await axios.get('https://paste.ee/latest');
    const body = res.data;
    const matches = [...body.matchAll(/href="(\/p\/[a-zA-Z0-9]+)"/g)];
    return matches.map(m => `https://paste.ee${m[1]}`).slice(0, 5);
  } catch (err) {
    console.error('Ошибка получения списка паст:', err.message);
    return [];
  }
}

async function fetchPasteContent(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`Ошибка загрузки пасты: ${url}`, err.message);
    return '';
  }
}

async function scanPastebinSources() {
  const links = await fetchRecentPastes();
  for (let url of links) {
    if (pastedUrls.has(url)) continue; // пропускаем уже проверенные
    pastedUrls.add(url);

    const content = await fetchPasteContent(url);
    const found = extractKeys(content);

    if (found.length > 0) {
      await sendToTelegram(found.join('\n'), `🔐 Pastebin HIT: ${url}`);
    }
  }
}

async function mainLoop() {
  console.log('🔄 Запуск цикла поиска...');
  while (true) {
    try {
      await scanPastebinSources();
    } catch (err) {
      console.error('Ошибка в основном цикле:', err.message);
    }

    await new Promise(resolve => setTimeout(resolve, 10000)); // пауза 10 сек
  }
}

mainLoop();

const { fetchPasteLinks } = require('./scraper');

setInterval(async () => {
  console.log('🔁 Запуск цикла поиска паст:');
  const foundLinks = await fetchPasteLinks();
  await processLinks(foundLinks);
  console.log('🧩 Найдено ссылок:', foundLinks.length);

  // Здесь можно прокинуть foundLinks дальше (в fetcher или другую очередь)
}, 5 * 60 * 1000); // каждые 5 минут
