const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  login: () => ipcRenderer.invoke('login'),
  createControl: () => ipcRenderer.send('control'),
})
