const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  login: () => ipcRenderer.invoke('login'),
  createControl: () => ipcRenderer.send('control'),
  getScreen: () => ipcRenderer.invoke('getScreen'),
  mouseMove: (x = 0, y = 0) => ipcRenderer.invoke('mouseMove', x, y),
})
