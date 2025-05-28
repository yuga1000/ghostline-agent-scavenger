const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendToTelegram(text) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Telegram credentials missing');
    return;
  }

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });
  } catch (e) {
    console.error('Ошибка отправки в Telegram:', e.message);
  }
}

module.exports = { sendToTelegram };
