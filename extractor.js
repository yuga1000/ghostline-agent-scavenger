const fs = require('fs');
const path = require('path');

function isPossiblePrivateKey(str) {
  return /^[a-fA-F0-9]{64}$/.test(str);
}

function extractKeysFromFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const words = content.split(/\s+/);
  return words.filter(isPossiblePrivateKey);
}

function extractFromAllFiles(directory = '.') {
  const files = fs.readdirSync(directory).filter(f => f.endsWith('.txt'));
  const foundKeys = [];

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const keys = extractKeysFromFile(fullPath);
    if (keys.length > 0) {
      console.log(`🔑 Найдено ${keys.length} ключей в ${file}`);
      foundKeys.push(...keys);
    }
  }

  return foundKeys;
}

module.exports = { extractFromAllFiles };
