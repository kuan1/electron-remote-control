const { app } = require('electron')
const { create: createWin } = require('./mainWindow')
const handleIPC = require('./handleIPC')

app.on('ready', () => {
  createWin()
  handleIPC()
})
