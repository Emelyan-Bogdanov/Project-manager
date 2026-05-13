const { ipcMain } = require('electron');
const fetch = require('node-fetch');

// Configuration de l'URL de base du backend Flask
const FLASK_BASE_URL = 'http://localhost:5000';

ipcMain.handle('get-users', async () => {
    try {
        const response = await fetch(`${FLASK_BASE_URL}/api/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
});

ipcMain.handle('get-tasks', async () => {
    try {
        const response = await fetch(`${FLASK_BASE_URL}/api/tasks`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
});

ipcMain.handle('get-workspaces', async () => {
    try {
        const response = await fetch(`${FLASK_BASE_URL}/api/workspaces`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const workspaces = await response.json();
        return workspaces;
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [];
    }
});

ipcMain.handle('get-messages', async () => {
    try {
        // Note: Cette route n'existe pas encore dans le backend
        // Vous devrez l'ajouter dans messages.py
        const response = await fetch(`${FLASK_BASE_URL}/api/messages`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
});
