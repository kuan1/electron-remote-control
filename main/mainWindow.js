const path = require('path')
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

let win

function create() {
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
}

function send(channel, ...args) {
  if (!win) return console.error('win is not ready')
  win.webContents.send(channel, ...args)
}

module.exports = {
  create,
  send
}
