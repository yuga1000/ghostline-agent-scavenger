const fs = require('fs');
const path = require('path');

function saveTextToFile(name, content) {
  const filePath = path.join(__dirname, 'dumps', name);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

module.exports = { saveTextToFile };
