import { sendData } from './webRTC.js'
import throttle from '../vendor/throttle.js'
import { getScreenSize } from '../vendor/electron.js'

const video = document.querySelector('video')

let isBind = false

const onmousemove = throttle((e) => {
  const { clientX, clientY } = e
  sendData({ event: 'moveMouse', data: { x: clientX, y: clientY } })
}, 100)

// returns promise
export async function sendScreenSize() {
  const { width, height } = await getScreenSize()
  sendData({ event: 'adjustWindowSize', data: { width, height } })
}

export function bindEvent() {
  if (isBind) return
  isBind = true
  video.addEventListener('mousemove', onmousemove)
}

export function removeEvent() {
  video.removeEventListener('mousemove', onmousemove)
  isBind = false
}
