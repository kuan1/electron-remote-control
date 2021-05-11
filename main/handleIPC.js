const { ipcMain } = require('electron')
const robot = require('robotjs')
const { adjustSize } = require('./windows/main')

module.exports = () => {
  ipcMain.handle('getScreen', async () => {
    const screenSize = robot.getScreenSize()
    const height = screenSize.height
    const width = screenSize.width

    return { width, height }
  })

  ipcMain.handle('moveMouse', (e, x, y) => robot.moveMouse(x, y))

  ipcMain.handle('adjustWindowSize', (e, width = 800, height = 600) => adjustSize(width, height))

  ipcMain.handle('keyToggle', (e, key, type) => robot.keyToggle(key, type))

  ipcMain.handle('mouseClick', (e, button, double) => robot.mouseClick(button, double))
}
