const { ipcMain } = require('electron')
const robot = require('robotjs')

module.exports = () => {
  ipcMain.handle('getScreen', async () => {
    const screenSize = robot.getScreenSize()
    const height = screenSize.height / 2 - 10
    const width = screenSize.width

    return { width, height }
  })

  ipcMain.handle('moveMouse', (e, x, y) => {
    robot.moveMouse(x, y)
  })
}
