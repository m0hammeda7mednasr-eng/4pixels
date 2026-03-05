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
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data || data.trim() === '') {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error reading ${filename}:`, err.message);
    }
    return [];
  }
};

const writeJSON = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    return true;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error writing ${filename}:`, err.message);
    }
    return false;
  }
};

const generateId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).slice(2, 11);
  return `${timestamp}-${randomStr}`;
};

module.exports = {
  readJSON,
  writeJSON,
  generateId
};
