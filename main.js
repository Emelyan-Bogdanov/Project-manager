const { app, BrowserWindow } = require('electron');
const {createWindow} = require("./src/main/window")

const fs = require('fs');
const path = require('path');





app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});