

const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    // movable: false, // position fixe 
    icon: '../assets/imgs/icon.png',
    title: "Gestionnaire de projets",
    center : true,
    // frame:false // remove top bar buttons [minimize,fullscreen,close]

  });

  win.loadFile('../templates/main.html');
}




// exports everything if want to import from outside
module.exports = {
  createWindow
};