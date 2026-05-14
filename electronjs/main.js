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

async function checkUsersExist() {
    try {
        const res = await fetch('http://localhost:5000/howmanyusers');
        if (res.ok) {
            const count = parseInt(await res.text(), 10);
            if (count === 0) {
                try { fs.unlinkSync(getSessionFile()); } catch {}
                win.loadFile("src/templates/auth/login.html");
            }
        }
    } catch {
        console.log('Server unreachable, keeping session');
    }
}

async function MainApp() {
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

  const startPage = getStartPage();
  win.loadFile(startPage);

  if (startPage === "src/templates/dashboard.html") {
    await checkUsersExist();
  }

  ipcMain.on("open-profile", () => {
    win.loadFile("src/templates/profile.html");
  });

  ipcMain.on("all-users", () => {
    win.loadFile("src/templates/allUsers.html");
  });

  ipcMain.on("navigate", (event, page) => {
    const [filePath, queryString] = page.split('?');
    const query = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};
    const fullPath = filePath.startsWith("src/templates/") ? filePath : "src/templates/" + filePath;
    win.loadFile(fullPath, { query });
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
