const { app, BrowserWindow } = require('electron')
const localShortcut = require('electron-localshortcut')

const isMacOS = process.platform === 'darwin'

const devToolsOptions = {}

function toggleDevTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    const { webContents } = win
    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools()
    } else {
      webContents.openDevTools(devToolsOptions)
    }
  }
}

function devTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    toggleDevTools(win)
  }
}

function openDevTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    win.webContents.openDevTools(devToolsOptions)
  }
}

function refresh(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    win.webContents.reloadIgnoringCache()
  }
}

function inspectElements() {
  const win = BrowserWindow.getFocusedWindow()
  const inspect = () => {
    win.devToolsWebContents.executeJavaScript('DevToolsAPI.enterInspectElementMode()')
  }

  if (win) {
    if (win.webContents.isDevToolsOpened()) {
      inspect()
    } else {
      win.webContents.once('devtools-opened', inspect)
      win.openDevTools()
    }
  }
}

module.exports = function setupDevtool() {
  app.on('browser-window-created', (event, win) => {
    win.webContents.once('dom-ready', () => {
      openDevTools(win)
    })
  })
  ;(async () => {
    await app.whenReady()

    localShortcut.register('CommandOrControl+Shift+C', inspectElements)
    localShortcut.register(isMacOS ? 'Command+Alt+I' : 'Control+Shift+I', devTools)
    localShortcut.register('F12', devTools)

    localShortcut.register('CommandOrControl+R', refresh)
    localShortcut.register('F5', refresh)
  })()
}
