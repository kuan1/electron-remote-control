const { desktopCapturer, moveMouse } = window.electron || {}

const isElectron = !!window.electron

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
  if (!isElectron) return console.log(x, y)
  moveMouse(x, y)
}

export { getScreenStream, bindMoveMouse }
