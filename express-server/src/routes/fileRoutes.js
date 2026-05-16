const { Router } = require('express');
const ctrl = require('../controllers/fileController');
const { createUploader } = require('../middleware/upload');
const path = require('path');
const uploadsDir = path.resolve(__dirname, '../../uploads');
const upload = createUploader(uploadsDir);

const router = Router();

router.get('/api/files', ctrl.list);
router.post('/api/files/upload', upload.single('file'), ctrl.upload);
router.get('/api/files/:id/download', ctrl.download);
router.delete('/api/files/:id/delete', ctrl.remove);

module.exports = router;
