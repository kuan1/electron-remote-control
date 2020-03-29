const { ipcMain } = require('electron')

module.exports = () => {
  ipcMain.handle('login', async () => {
    const code =
      Math.max(Math.floor(Math.random() * 999999 - 100000), 0) + 100000
    return code
  })
}
