const { contextBridge, ipcRenderer, desktopCapturer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  desktopCapturer,
  getScreen: () => ipcRenderer.invoke('getScreen'),
  moveMouse: (x = 0, y = 0) => ipcRenderer.invoke('moveMouse', x, y),
  adjustWindowSize: (width, height) => ipcRenderer.invoke('adjustWindowSize', width, height),
  keyToggle: (key, type) => ipcMain.invoke('keyToggle', key, type),
})
