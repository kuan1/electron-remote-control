const { protocol, app } = require('electron')
const path = require('path')
const { readFile } = require('fs')
const { URL } = require('url')

const { static, scheme } = require('../constant')

// Scheme must be registered before the app is ready
function createProtocol(schemeName = scheme) {
  protocol.registerSchemesAsPrivileged([{ scheme: schemeName, privileges: { secure: true, standard: true } }])

  app.on('ready', () => {
    protocol.registerBufferProtocol(scheme, (request, respond) => {
      if (!request.url) {
        return console.error(`Failed to register ${scheme} protocol`, error)
      }
      let pathName = new URL(request.url).pathname
      pathName = decodeURI(pathName) // Needed in case URL contains spaces

      readFile(path.join(static, pathName), (error, data) => {
        if (error) {
          console.error(`Failed to read ${pathName} on ${scheme} protocol`, error)
        }
        const extension = path.extname(pathName).toLowerCase()
        let mimeType = ''

        if (extension === '.js') {
          mimeType = 'text/javascript'
        } else if (extension === '.html') {
          mimeType = 'text/html'
        } else if (extension === '.css') {
          mimeType = 'text/css'
        } else if (extension === '.svg' || extension === '.svgz') {
          mimeType = 'image/svg+xml'
        } else if (extension === '.json') {
          mimeType = 'application/json'
        }

        respond({ mimeType, data })
      })
    })
  })
}

module.exports = createProtocol
