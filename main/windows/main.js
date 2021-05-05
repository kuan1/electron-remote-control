const { BrowserWindow } = require('electron')
const { scheme } = require('../constant')
const resolve = require('../utils/resolve')

let win

function create() {
  win = new BrowserWindow({
    width: 1000,
    height: 680,
    show: false,
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

function send(channel, ...args) {
  if (!win) return console.error('win is not ready')
  win.webContents.send(channel, ...args)
}

module.exports = {
  create,
  send,
}
