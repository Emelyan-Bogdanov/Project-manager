const path = require('path');
const fs = require('fs');
const { FileEntry, User } = require('../models');

exports.list = async (req, res) => {
  const files = await FileEntry.findAll({ order: [['id', 'DESC']] });
  const result = await Promise.all(files.map(async (f) => {
    const uploader = f.uploaded_by ? User.findByPk(f.uploaded_by) : null;
    return {
      id: f.id,
      filename: f.filename,
      original_name: f.original_name,
      size: f.size,
      mime_type: f.mime_type,
      uploaded_by: f.uploaded_by,
      uploader_name: uploader ? (await uploader).username : 'Inconnu',
      created_at: f.created_at,
    };
  }));
  res.json(result);
};

exports.upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const originalName = req.file.originalname;
  const filename = req.file.filename;
  const filepath = req.file.path;
  const size = fs.statSync(filepath).size;
  const mimeType = req.file.mimetype || '';
  const uploadedBy = parseInt(req.body.uploaded_by) || 0;
  const createdAt = new Date().toISOString().replace('T', ' ').split('.')[0];

  const entry = await FileEntry.create({
    filename,
    original_name: originalName,
    filepath,
    size,
    mime_type: mimeType,
    uploaded_by: uploadedBy,
    created_at: createdAt,
  });
  res.json({ id: entry.id, message: 'File uploaded' });
};

exports.download = async (req, res) => {
  const entry = await FileEntry.findByPk(req.params.id);
  if (!entry || !fs.existsSync(entry.filepath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.download(entry.filepath, entry.original_name);
};

exports.remove = async (req, res) => {
  const entry = await FileEntry.findByPk(req.params.id);
  if (!entry) return res.status(404).json({ error: 'File not found' });
  if (fs.existsSync(entry.filepath)) fs.unlinkSync(entry.filepath);
  await entry.destroy();
  res.json({ message: 'File deleted' });
};
