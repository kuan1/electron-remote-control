const { desktopCapturer } = window.electron

async function getScreenStream() {
  // return navigator.mediaDevices.getUserMedia({ audio: false, video: true })
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

export { getScreenStream }
