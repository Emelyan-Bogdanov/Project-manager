const { Notification } = require('electron');

const FLASK_BASE_URL = 'http://localhost:5000';
const CHECK_INTERVAL_MS = 60000;
const REMINDER_WINDOW_MIN = 5;

let notifiedMap = {};
let intervalId = null;
let mainWindow = null;

function start(win) {
    mainWindow = win;
    checkReminders();
    intervalId = setInterval(checkReminders, CHECK_INTERVAL_MS);
}

function stop() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

async function fetchUpcoming() {
    try {
        const res = await fetch(
            `${FLASK_BASE_URL}/api/tasks/upcoming-reminders?window=${REMINDER_WINDOW_MIN}`
        );
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error('[reminder] fetch failed:', e.message);
        return [];
    }
}

async function checkReminders() {
    const tasks = await fetchUpcoming();
    for (const task of tasks) {
        if (notifiedMap[task.id] === task.reminder) continue;
        notifiedMap[task.id] = task.reminder;
        if (!mainWindow || mainWindow.isDestroyed()) continue;
        const n = new Notification({
            title: `Rappel: ${task.title}`,
            body: `Échéance: ${task.deadline}${task.workspaceName ? `\nProjet: ${task.workspaceName}` : ''}`,
        });
        n.on('click', () => {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.loadFile('src/templates/task.html', { query: { id: String(task.id) } });
            }
        });
        n.show();
    }
}

module.exports = { start, stop };
