// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let win;
let encrypt = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1150,
    height: 850,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools();
  win.setMenuBarVisibility(false);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("loadSave", (event, args) => {
  const fs = require('fs');
  var data = fs.readFileSync('sav.dat', 'utf-8');
  var data2 = '';
  for(var i = 0; i < data.length; i++){
    if(i%2==0) data2 += data[i];
  }
  var save = JSON.parse(data2);
  win.webContents.send("saveLoaded", save); 
});

ipcMain.on("saveGame", (event, args) => {
  const fs = require('fs');
  var data = JSON.stringify(args);
  var data2 = '';
  for(var i = 0; i < data.length; i++){
    data2 += data[i] + encrypt[i%26];
  }
  fs.writeFileSync('sav.dat', data2);
});