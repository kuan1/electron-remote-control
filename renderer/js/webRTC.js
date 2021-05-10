const constraints = { audio: false, video: true }

const handleError = (type, shouldAlert = false) => (error) => {
  if (shouldAlert) alert(error)
  console.error(type, error)
  return Promise.reject(error)
}

let pc
let stream
let readyCallbacks = []
let icecandidades = []

function initPC(isOffer = true, video) {
  if (pc) return pc

  pc = new RTCPeerConnection()

  if (isOffer) {
    pc.onaddstream = function (e) {
      video.srcObject = e.stream
    }
    return pc
  }

  return getStream()

  function getStream() {
    navigator.mediaDevices
      .getDisplayMedia(constraints)
      .then((e) => {
        stream = e
        pc.addStream(stream)
        // 通知ready
        readyCallbacks.forEach((resolve) => resolve())
        readyCallbacks = []
        return pc
      })
      .catch(handleError('getStream', true))
  }
}

function ready() {
  if (pc) return pc
  return new Promise((resolve) => {
    readyCallbacks.push(resolve)
  })
}

function getCandidades() {
  if (icecandidades.length) return icecandidades
  let tmp = []
  return new Promise((resolve) => {
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        tmp.push(e.candidate)
      } else {
        icecandidades = tmp
        resolve(icecandidades)
      }
    }
  })
}

async function createOffer() {
  return pc
    .createOffer({
      offerToReceiveAudio: constraints.audio ? 1 : 0,
      offerToReceiveVideo: constraints.video ? 1 : 0,
    })
    .then((desc) => {
      pc.setLocalDescription(desc)
      return desc
    })
    .catch(handleError('createOffer'))
}

// 获取offer、icecandidades
async function getOfferAndIcecandidades() {
  await ready()
  const [icecandidades, offer] = await Promise.all([getCandidades(), createOffer()])
  // console.log(JSON.stringify({ icecandidades, offer }))
  return { icecandidades, offer }
}

// 响应answer
function accessAnswer({ icecandidades = [], answer = {} }) {
  if (!pc) return console.error('pc not ready')
  pc.setRemoteDescription(answer)
  icecandidades.forEach((condidate) => pc.addIceCandidate(new RTCIceCandidate(condidate)))
}

async function createAnswer(offer) {
  try {
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    return answer
  } catch (e) {
    return handleError('createAnswer')(e)
  }
}

async function getAnswerAndIcecandidades(data) {
  await ready()
  const [icecandidades, answer] = await Promise.all([getCandidades(), createAnswer(data.offer)])
  data.icecandidades.forEach((condidate) => pc.addIceCandidate(new RTCIceCandidate(condidate)))
  // console.log('condidade', JSON.stringify(condidades))
  // console.log('offer', JSON.stringify(answer))
  return { icecandidades, answer }
}

function close() {
  if (!pc) return
  pc.close()
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }
  stream = null
}

export { initPC, getOfferAndIcecandidades, accessAnswer, getAnswerAndIcecandidades, close }
