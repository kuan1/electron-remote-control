const { contextBridge, ipcRenderer, desktopCapturer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  desktopCapturer,
  getScreen: () => ipcRenderer.invoke('getScreen'),
  moveMouse: (x = 0, y = 0) => ipcRenderer.invoke('moveMouse', x, y),
  adjustWindowSize: (width, height) => ipcRenderer.invoke('adjustWindowSize', width, height),
  keyToggle: (key, type) => ipcRenderer.invoke('keyToggle', key, type),
  mouseClick: (button, double) => ipcRenderer.invoke('mouseClick', button, double),
})
