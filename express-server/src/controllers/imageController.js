const path = require('path');
const fs = require('fs');
const imagesDir = path.resolve(__dirname, '../../images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const filename = req.file.filename;
  res.json({
    success: true,
    url: `http://localhost:5000/api/images/${filename}`,
    path: `images/${filename}`,
    filename,
  });
};

exports.serve = (req, res) => {
  const filepath = path.join(imagesDir, req.params.filename);
  if (!fs.existsSync(filepath)) return res.status(404).json({ error: 'Image not found' });
  res.sendFile(filepath);
};

exports.remove = (req, res) => {
  const filepath = path.join(imagesDir, req.params.filename);
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  res.json({ success: true, message: 'Image deleted' });
};
