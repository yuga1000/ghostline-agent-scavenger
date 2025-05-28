const axios = require('axios');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(message) {
  if (!token || !chatId) {
    console.error('❌ TELEGRAM_TOKEN или TELEGRAM_CHAT_ID не заданы.');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
  };

  try {
    await axios.post(url, payload);
    console.log('✅ Отправлено в Telegram');
  } catch (error) {
    console.error('❌ Ошибка при отправке в Telegram:', error.message);
  }
}

module.exports = { sendTelegramMessage };
