const { getScreen, adjustWindowSize: setWinSize, desktopCapturer, moveMouse } = window.electron || {}

const isElectron = !!window.electron

async function getScreenSize() {
  return isElectron ? getScreen() : { width: window.screen.width, height: window.screen.height }
}

// 调整页面大小
async function adjustWindowSize(width, height) {
  if (!isElectron) return console.log('asjustWindowSize', width, height)
  setWinSize(width, height)
}

async function getScreenStream() {
  // 这段代码是测试用的，如果不是electron环境则使用摄像头
  if (!isElectron) return navigator.mediaDevices.getUserMedia({ audio: false, video: true })
  // 否则使用桌面流
  const sources = await desktopCapturer.getSources({ types: ['screen'] })
  return new Promise((resolve, reject) => {
    navigator.webkitGetUserMedia(
      {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[0].id,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height,
          },
        },
      },
      (stream) => {
        resolve(stream)
      },
      reject
    )
  })
}

function bindMoveMouse(x, y) {
  if (!isElectron) return console.log('bindMoveMouse', x, y)
  moveMouse(x, y)
}

export { getScreenSize, adjustWindowSize, getScreenStream, bindMoveMouse }
