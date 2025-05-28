export function parseDumpFile(text) {
  const lines = text.split('\n');
  const keys = [];

  for (const line of lines) {
    const match = line.match(/\b[a-f0-9]{64}\b/i);
    if (match) keys.push(match[0]);
  }

  return keys;
}
