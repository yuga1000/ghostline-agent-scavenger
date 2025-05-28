const { Telegraf } = require('telegraf');
const { fetchArchiveDumps } = require('./archiveScraper');
const dotenv = require('dotenv');
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const MIN_BALANCE = 0.001;

async function checkDump(link) {
  // Здесь может быть логика анализа дампа по ссылке
  if (link.includes('wallet') || link.includes('dump')) {
    await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, `Найден архивный дамп:\n${link}`);
    console.log('Отправлено в Telegram:', link);
  }
}

async function mainCycle() {
  console.log('Запуск цикла...');
  try {
    const archiveLinks = await fetchArchiveDumps();
    for (const link of archiveLinks) {
      await checkDump(link);
    }
  } catch (err) {
    console.error('Ошибка в цикле:', err);
  }
}

setInterval(mainCycle, 1000 * 60 * 5); // каждые 5 минут
mainCycle();
