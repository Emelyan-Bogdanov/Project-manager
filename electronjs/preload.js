const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getUsers: () => ipcRenderer.invoke('get-users'),
    getTasks: () => ipcRenderer.invoke('get-tasks'),
    getTask: (id) => ipcRenderer.invoke('get-task', id),
    getWorkspaces: () => ipcRenderer.invoke('get-workspaces'),
    getWorkspace: (id) => ipcRenderer.invoke('get-workspace', id),
    getWorkspaceTasks: (id) => ipcRenderer.invoke('get-workspace-tasks', id),
    getFiles: () => ipcRenderer.invoke('get-files'),
    deleteFile: (id) => ipcRenderer.invoke('delete-file', id),
    createUser: (data) => ipcRenderer.invoke('create-user', data),
    updateUser: (id, data) => ipcRenderer.invoke('update-user', id, data),
    createTask: (data) => ipcRenderer.invoke('create-task', data),
    updateTask: (id, data) => ipcRenderer.invoke('update-task', id, data),
    createWorkspace: (data) => ipcRenderer.invoke('create-workspace', data),
    login: (credentials) => ipcRenderer.invoke('login', credentials),
    logout: () => ipcRenderer.invoke('logout'),
    checkSession: () => ipcRenderer.invoke('check-session'),
    navigate: (page) => ipcRenderer.send('navigate', page),
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('http://localhost:5000/api/images/upload', {
            method: 'POST',
            body: formData,
        });
        return res.json();
    },
    deleteServerImage: async (filename) => {
        const res = await fetch(`http://localhost:5000/api/images/${filename}`, {
            method: 'DELETE',
        });
        return res.json();
    },
})
