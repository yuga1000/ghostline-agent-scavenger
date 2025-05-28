const fs = require('fs');
const path = require('path');

function fetchPasteLinks() {
  // Сохраняем sample_dump.txt как локальную ссылку
  const fullPath = path.join(__dirname, 'sample_dump.txt');
  return [fullPath];
}

module.exports = { fetchPasteLinks };
