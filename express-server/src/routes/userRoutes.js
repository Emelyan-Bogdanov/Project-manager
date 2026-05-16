const { Router } = require('express');
const ctrl = require('../controllers/userController');

const router = Router();

router.get('/users', ctrl.list);
router.get('/api/users', ctrl.list);
router.get('/howmanyusers', ctrl.count);
router.post('/api/users', ctrl.create);
router.patch('/api/users/:id', ctrl.update);
router.put('/api/users/:id', ctrl.update);
router.get('/deleteuser/:id', ctrl.remove);
router.post('/api/login', ctrl.login);

module.exports = router;
