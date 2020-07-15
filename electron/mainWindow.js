const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

// BrowserWindow instance
exports.mainWindow = null;

exports.createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  this.mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    icon: __dirname + '/mario.png',
    webPreferences: {
      nodeIntegration: true,
      //   contextIsolation: true,
      //   enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  this.mainWindow.loadURL(startUrl);
  this.mainWindow.removeMenu();
  this.mainWindow.on('close', function () {
    this.mainWindow = null;
  });
  //open debugging
  this.mainWindow.webContents.openDevTools();
};
