import { getScreenStream, adjustWindowSize } from '../vendor/electron.js'
import onReceiveData from './onReceiveData.js'
import { sendScreenSize, removeEvent } from './bindSendDataEvent.js'

const handleError = (type, shouldAlert = false) => (error) => {
  if (shouldAlert) alert(error)
  console.error(type, error)
  return Promise.reject(error)
}

let type = 'offer' // answer
let pc
let stream
let readyCallbacks = []
let icecandidades = []
let sendChannel
let receiveChannel
let tmpSendData = []

function initOfferPC(video) {
  type = 'offer'
  if (pc) return pc
  tmpSendData = []
  pc = new RTCPeerConnection()
  pc.onaddstream = function (e) {
    video.srcObject = e.stream
  }
  sendChannel = pc.createDataChannel('sendDataChannel')
  // 防止数据提前发出
  sendChannel.onopen = () => {
    tmpSendData.forEach((data) => sendData(data))
    tmpSendData = []
  }
  pc.ondatachannel = receiveChannelCallback
  return pc
}

function initAnswerPC(video) {
  if (!pc) initOfferPC(video)
  type = 'answer'
  return stream ? pc : getStream()

  function getStream() {
    return getScreenStream()
      .then((e) => {
        stream = e
        pc.addStream(stream)
        video.srcObject = stream
        // 通知ready
        readyCallbacks.forEach((resolve) => resolve())
        readyCallbacks = []
        return pc
      })
      .catch(handleError('getStream', true))
  }
}

function receiveChannelCallback(event) {
  receiveChannel = event.channel
  receiveChannel.onmessage = onReceiveData
  // 发送当前桌面尺寸到控制端
  type === 'answer' && sendScreenSize()
}

function sendData(data) {
  console.log(data)
  if (!sendChannel) {
    return console.error('sendChannel is null')
  }
  if (sendChannel.readyState === 'open') {
    sendChannel.send(JSON.stringify(data))
  } else {
    tmpSendData.push(data)
  }
}

function streamReady() {
  if (stream) return true
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
      offerToReceiveAudio: false,
      offerToReceiveVideo: true,
    })
    .then((desc) => {
      pc.setLocalDescription(desc)
      return desc
    })
    .catch(handleError('createOffer'))
}

// 获取offer、icecandidades
async function getOfferAndIcecandidades() {
  if (!pc) throw new Error('pc is null')
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
  await streamReady()
  const [icecandidades, answer] = await Promise.all([getCandidades(), createAnswer(data.offer)])
  data.icecandidades.forEach((condidate) => pc.addIceCandidate(new RTCIceCandidate(condidate)))
  // console.log('condidade', JSON.stringify(condidades))
  // console.log('offer', JSON.stringify(answer))
  return { icecandidades, answer }
}

// 关闭webrtc链接
function close() {
  if (!pc) return
  pc.close()
  sendChannel && sendChannel.close()
  receiveChannel && receiveChannel.close()
  stream && stream.getTracks().forEach((track) => track.stop())
  sendChannel = receiveChannel = pc = stream = null
  icecandidades = []
  readyCallbacks = []
  document.querySelector('.video-wrap').classList.add('hide')
  removeEvent()
  adjustWindowSize(850, 650)
}

export { initOfferPC, initAnswerPC, getOfferAndIcecandidades, accessAnswer, getAnswerAndIcecandidades, close, sendData }
