const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getUsers: () => ipcRenderer.invoke('get-users'),
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    getMessages: () => ipcRenderer.invoke('get-messages'),
    getWorkspaces: () => ipcRenderer.invoke('get-workspaces'),
    login: (credentials) => ipcRenderer.invoke('login', credentials),
    logout: () => ipcRenderer.invoke('logout'),
    checkSession: () => ipcRenderer.invoke('check-session'),
    navigate: (page) => ipcRenderer.send('navigate', page),
})
