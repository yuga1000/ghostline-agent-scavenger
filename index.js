import dotenv from 'dotenv';
dotenv.config();

import { parseDumpFile } from './parser.js';
import { sendToTelegram } from './telegram.js';
import { checkKey } from './utils.js';
import fs from 'fs';

const DUMP_FOLDER = './dumps';
const processed = new Set();

async function processDumpFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const keys = parseDumpFile(content);
  
  for (const key of keys) {
    if (processed.has(key)) continue;
    processed.add(key);

    const result = await checkKey(key);
    if (result && result.balance >= process.env.MIN_BALANCE) {
      await sendToTelegram(result);
    }
  }
}

async function start() {
  const files = fs.readdirSync(DUMP_FOLDER);
  for (const file of files) {
    const path = `${DUMP_FOLDER}/${file}`;
    await processDumpFile(path);
  }
}

start();
