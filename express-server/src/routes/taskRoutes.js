const { Router } = require('express');
const ctrl = require('../controllers/taskController');

const router = Router();

router.get('/tasks', ctrl.list);
router.get('/api/tasks', ctrl.list);
router.get('/api/tasks/upcoming-reminders', ctrl.upcomingReminders);
router.get('/api/workspaces/:id/tasks', ctrl.byWorkspace);
router.get('/task/:id', ctrl.get);
router.post('/addtask', ctrl.create);
router.patch('/task/:id', ctrl.update);

module.exports = router;
