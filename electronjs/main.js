const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

require('./src/main/ipc');

let win;

function getSessionFile() {
    return path.join(app.getPath('userData'), 'user-session.json');
}

function getStartPage() {
    try {
        const session = JSON.parse(fs.readFileSync(getSessionFile(), 'utf8'));
        if (session.rememberMe && session.user) {
            return "src/templates/dashboard.html";
        }
    } catch {}
    return "src/templates/auth/login.html";
}

function MainApp() {
  win = new BrowserWindow({
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 730,
    icon: path.join(__dirname, "src/assets/imgs/icon.png"),
    title: "Gestionnaire de projets",
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(getStartPage());

  ipcMain.on("open-profile", () => {
    win.loadFile("src/templates/profile.html");
  });

  ipcMain.on("all-users", () => {
    win.loadFile("src/templates/allUsers.html");
  });

  ipcMain.on("navigate", (event, page) => {
    win.loadFile(page);
  });

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(MainApp);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
