const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createUploader(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dirPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || '.png';
      const name = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
      cb(null, name);
    },
  });
  return multer({ storage });
}

module.exports = { createUploader };
