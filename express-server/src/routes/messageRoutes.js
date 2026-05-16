const { Router } = require('express');
const ctrl = require('../controllers/messageController');

const router = Router();

router.get('/messages/:id/', ctrl.byWorkspace);

module.exports = router;
