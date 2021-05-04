const { BrowserWindow } = require('electron')
const { scheme } = require('./constant')
const resolve = require('./utils/resolve')

let win

function create() {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: resolve('main/preload'),
    },
  })

  win.loadURL(`${scheme}:///./control.html`)
}

module.exports = {
  create,
}
