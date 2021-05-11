const { BrowserWindow } = require('electron')
const { scheme } = require('../constant')
const resolve = require('../utils/resolve')

let win

function create() {
  win = new BrowserWindow({
    width: 850,
    height: 650,
    show: false,
    center: true,
    resizable: false,
    webPreferences: {
      preload: resolve('main/preload'),
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  })

  win.on('ready-to-show', () => {
    win.show() // 初始化后再显示
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL(`${scheme}:///./index.html`)
}

function adjustSize(width, height) {
  if (!win) throw new Error('win is null')
  win.setSize(width, height)
  win.center()
}

module.exports = {
  create,
  adjustSize,
}
