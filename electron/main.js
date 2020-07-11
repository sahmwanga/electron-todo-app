const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const {
  addTask,
  listTask,
  deleteAllTask,
  deleteById,
} = require('./services/task.service');

const { tasks } = require('../src/shared/constants');

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
  // mainWindow.removeMenu()
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

ipcMain.on(tasks.CREATE_TASK, async (event, arg) => {
  try {
    const task = await addTask(arg);
    fetchTasks(event);
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on(tasks.GET_TASK, (event, args) => {
  fetchTasks(event);
});

const fetchTasks = (event) => {
  listTask()
    .then((data) => event.sender.send(tasks.GET_TASK, { data }))
    .catch((error) => console.log(error));
};

ipcMain.on(tasks.DELETE_TASK, (event, args) => {
  console.log('about to delete task by id');
  deleteById(args.taskId)
    .then((data) => fetchTasks(event))
    .catch((error) => console.log(error));
});

ipcMain.on(tasks.DELETE_ALL_TASK, (event) => {
  console.log('about to delete all task');
  deleteAllTask()
    .then((data) => fetchTasks(event))
    .catch((error) => console.log(error));
});
