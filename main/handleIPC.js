const { ipcMain } = require('electron')
const { send: sendMainWindow } = require('./windows/main')
const robot = require('./utils/robot')

module.exports = () => {
  ipcMain.handle('login', async () => {
    const code = Math.max(Math.floor(Math.random() * 999999 - 100000), 0) + 100000
    return code
  })

  ipcMain.on('control', async (e, remoteCode) => {
    sendMainWindow('control-state-change', { name: remoteCode, type: 1 })
  })

  ipcMain.handle('getScreen', async () => {
    return robot.getScreen()
  })

  ipcMain.handle('mouseMove', (e, x, y) => {
    robot.mouseMove(x, y)
  })
}
