const { contextBridge, ipcRenderer, desktopCapturer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  desktopCapturer,
  getScreen: () => ipcRenderer.invoke('getScreen'),
  mouseMove: (x = 0, y = 0) => ipcRenderer.invoke('mouseMove', x, y),
})
