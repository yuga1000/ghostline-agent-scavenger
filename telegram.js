const axios = require('axios');
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.CHAT_ID;

async function sendToTelegram(text, header = '') {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('❌ TELEGRAM_TOKEN или CHAT_ID не заданы');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: TELEGRAM_CHAT_ID,
    text: `${header}\n\n${text}`,
    parse_mode: 'Markdown',
  });
}

module.exports = { sendToTelegram };
