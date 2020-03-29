const path = require('path')
const { BrowserWindow } = require('electron')
// const isDev = require('electron-is-dev')

let win

function create() {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile(
    path.resolve(__dirname, '..', 'renderer', 'public', 'control.html')
  )
}

module.exports = {
  create
}
