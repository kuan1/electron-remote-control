const { app, Menu, shell } = require('electron')
const isDev = require('electron-is-dev')
const { author } = require('../constant')

module.exports = class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow

    this.buildMenu()
  }

  buildMenu() {
    if (isDev) {
      this.setupDevelopmentEnvironment()
    }

    const template = process.platform === 'darwin' ? this.buildDarwinTemplate() : this.buildDefaultTemplate()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    return menu
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: '检查',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y)
          },
        },
      ]).popup({ window: this.mainWindow })
    })
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: '系统',
      submenu: [
        {
          label: '关闭',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    }
    const subMenuEdit = {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'Command+Z', selector: 'undo:' },
        { label: '恢复', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
        { label: '复制', accelerator: 'Command+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: '全选',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    }
    const subMenuView = {
      label: '视图',
      submenu: [
        {
          label: '切换全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
          },
        },
      ],
    }
    if (isDev) {
      subMenuView.submenu.push({
        label: '开发',
        accelerator: 'Alt+Command+I',
        click: () => {
          this.mainWindow.webContents.toggleDevTools()
        },
      })
    }
    const subMenuWindow = {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: '关闭', accelerator: 'Command+W', selector: 'performClose:' },
      ],
    }
    const subMenuHelp = {
      label: '关于',
      submenu: [
        {
          label: '作者',
          click() {
            shell.openExternal('https://github.com/kuan1')
          },
        },
      ],
    }

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp]
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&文件',
        submenu: [
          {
            label: '&关闭',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            },
          },
        ],
      },
      {
        label: '&视图',
        submenu: isDev
          ? [
              {
                label: '&刷新',
                accelerator: 'Ctrl+R',
                click: () => {
                  this.mainWindow.webContents.reload()
                },
              },
              {
                label: '切换全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                },
              },
              {
                label: '开发工具',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  this.mainWindow.webContents.toggleDevTools()
                },
              },
            ]
          : [
              {
                label: '切换全屏',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                },
              },
            ],
      },
      {
        label: '帮助',
        submenu: [
          {
            label: '关于',
            click() {
              shell.openExternal(author)
            },
          },
        ],
      },
    ]

    return templateDefault
  }
}
