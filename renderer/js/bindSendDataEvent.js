import { sendData } from './webRTC.js'
import throttle from '../vendor/throttle.js'

const video = document.querySelector('video')

let isBind = false

const onmousemove = throttle((e) => {
  const { clientX, clientY } = e
  sendData({ event: 'moveMouse', data: { x: clientX, y: clientY } })
}, 100)

export function bindEvent() {
  if (isBind) return
  isBind = true
  video.addEventListener('mousemove', onmousemove)
}

export function removeEvent() {
  video.removeEventListener('mousemove', onmousemove)
  isBind = false
}
