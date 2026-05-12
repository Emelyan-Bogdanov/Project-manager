const { app, BrowserWindow, ipcMain } = require("electron");

const fs = require("fs");
const path = require("path");

let win;

// main window
function MainApp() {
  win = new BrowserWindow({
    width: 1024,
    height: 500,
    minWidth: 850,
    minHeight: 450,
    // movable: false, // position fixe
    icon: "../assets/imgs/icon.png",
    title: "Gestionnaire de projets",
    center: true,

    // frame:false // remove top bar buttons [minimize,fullscreen,close]
  });

  // win.loadFile("./window.js")
  win.loadFile("src/templates/enhanced-index.html");

  ipcMain.on("open-profile", () => {
    win.loadFile("src/templates/profile.html");
  });

   win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(MainApp);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// if profile username clicked => goto profile infos

// do something before closing the window
app.on("before-quit", () => {});
