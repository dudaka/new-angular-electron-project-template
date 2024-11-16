const { app, BrowserWindow } = require('electron');
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    preload: path.join(__dirname, 'preload.js'),
  });

  if (process.env.DEBUG) {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadFile(path.join(__dirname, 'dist/new-angular-electron-project-template/browser/index.html'));
  }

  win.webContents.openDevTools();
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') 
        app.quit()
});