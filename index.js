const axios = require('axios');
const { sendToTelegram } = require('./telegram');

(async () => {
  const url = 'https://pastebin.com/raw/ETNjbnuA'; // твой pastebin RAW
  try {
    const res = await axios.get(url);
    const content = res.data;
    await sendToTelegram(content, '✅ Тестовая загрузка с Pastebin');
    console.log('✅ Отправлено в Telegram');
  } catch (err) {
    console.error('❌ Ошибка при загрузке:', err.message);
  }
})();
