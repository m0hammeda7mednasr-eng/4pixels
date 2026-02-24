const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const readJSON = (filename) => {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

const writeJSON = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
};

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).slice(2, 11);
};

module.exports = {
  readJSON,
  writeJSON,
  generateId
};
