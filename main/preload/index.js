const { contextBridge, ipcRenderer, desktopCapturer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  desktopCapturer,
  getScreen: () => ipcRenderer.invoke('getScreen'),
  moveMouse: (x = 0, y = 0) => ipcRenderer.invoke('moveMouse', x, y),
  adjustWindowSize: (width, height) => ipcRenderer.invoke('adjustWindowSize', width, height),
})
