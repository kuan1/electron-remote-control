const { ipcMain } = require('electron')
const robot = require('./utils/robot')

module.exports = () => {
  ipcMain.handle('getScreen', async () => {
    return robot.getScreen()
  })

  ipcMain.handle('mouseMove', (e, x, y) => {
    robot.mouseMove(x, y)
  })
}
