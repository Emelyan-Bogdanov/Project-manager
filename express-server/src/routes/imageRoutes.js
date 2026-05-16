const { Router } = require('express');
const ctrl = require('../controllers/imageController');
const { createUploader } = require('../middleware/upload');
const path = require('path');
const imagesDir = path.resolve(__dirname, '../../images');
const upload = createUploader(imagesDir);

const router = Router();

router.post('/api/images/upload', upload.single('file'), ctrl.upload);
router.get('/api/images/:filename', ctrl.serve);
router.delete('/api/images/:filename', ctrl.remove);

module.exports = router;
