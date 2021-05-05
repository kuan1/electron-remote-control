const { BrowserWindow } = require('electron')
const { scheme } = require('../constant')
const resolve = require('../utils/resolve')

let win

function create() {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    show: false,
    webPreferences: {
      preload: resolve('main/preload'),
    },
  })

  win.on('ready-to-show', () => {
    win.show() // 初始化后再显示
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL(`${scheme}:///./control.html`)
}

module.exports = {
  create,
}
