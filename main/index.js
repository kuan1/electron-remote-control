const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let win

app.on('ready', () => {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:8080/ ')
  } else {
    win.loadFile(
      path.resolve(__dirname, '..', 'renderer', 'dist', 'index.html')
    )
  }
})
