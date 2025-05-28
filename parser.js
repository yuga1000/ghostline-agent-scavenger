const { ethers } = require('ethers');

function isValidAddress(addr) {
  return ethers.isAddress(addr);
}

function parseLine(line) {
  try {
    const [maybeAddr, maybePriv] = line.split(/\s+/);
    if (!maybeAddr || !maybePriv) return null;

    const address = maybeAddr.trim();
    const privKey = maybePriv.trim();

    if (isValidAddress(address) && privKey.startsWith('0x') && privKey.length >= 64) {
      return `🔍 Найдена пара:\nАдрес: ${address}\nКлюч: ${privKey}`;
    }

    return null;
  } catch (e) {
    return null;
  }
}

module.exports = { parseLine };
