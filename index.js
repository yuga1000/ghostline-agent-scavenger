const fs = require('fs');
const path = require('path');
const parser = require('./parser');
const { sendToTelegram } = require('./telegram');

const dumpPath = path.join(__dirname, 'sample_dump.txt');

function scanDump() {
  const lines = fs.readFileSync(dumpPath, 'utf-8').split('\n').filter(Boolean);
  for (const line of lines) {
    const result = parser.parseLine(line.trim());
    if (result) {
      sendToTelegram(result);
    }
  }
}

scanDump();
