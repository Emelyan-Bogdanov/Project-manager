const { Router } = require('express');
const ctrl = require('../controllers/workspaceController');

const router = Router();

router.get('/workspaces', ctrl.list);
router.get('/api/workspaces', ctrl.list);
router.get('/workspace/:id', ctrl.get);
router.post('/addworkspace', ctrl.create);
router.post('/updateworkspace/:id', ctrl.update);
router.get('/deleteworkspace/:id', ctrl.remove);

module.exports = router;
