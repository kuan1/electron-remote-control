const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const { create: createWin } = require('./mainWindow')
const handleIPC = require('./handleIPC')

const createProtocol = require('./utils/createProtocol')
const setupDevtool = require('./utils/setupDevtool')

// app ready 前注册
createProtocol()

// 打开开发这工具
isDev && setupDevtool()

app.on('ready', () => {
  createWin()
  handleIPC()
})

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWin()
})
