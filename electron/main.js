const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const { addTask, listTask } = require('./services/task.service');

const { channels } = require('../src/shared/constants');

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      //   contextIsolation: true,
      //   enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('close', function () {
    mainWindow = null;
  });
  //open debugging
  // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
  }
});

app.on('activate', function () {
  if (mainWindow == null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, async (event, arg) => {
  const newTask = {
    title: arg,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const task = await addTask(newTask);
  console.log(task);
  event.sender.send(channels.APP_INFO, {
    task,
  });
});

ipcMain.on(channels.GET_TASK, async (event) => {
  const tasks = await listTask();
  console.log(tasks);
  event.sender.send(channels.GET_TASK, { tasks });
});
