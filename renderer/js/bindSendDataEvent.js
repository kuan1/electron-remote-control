import { sendData } from './webRTC.js'
// import throttle from '../vendor/throttle.js'
import { getScreenSize } from '../vendor/electron.js'
import getKey from '../vendor/getKey.js'

const video = document.querySelector('video')

let isBind = false

const onmousemove = (e) => {
  const { clientX, clientY } = e
  sendData({ event: 'moveMouse', data: { x: clientX, y: clientY } })
}

const onkeydown = (e) => {
  const key = getKey(e.key)
  if (!key) return console.log('key', e.key)
  sendData({ event: 'keyToggle', data: { key, type: 'down' } })
}

const onkeyup = (e) => {
  const key = getKey(e.key)
  if (!key) return console.log('key', e.key)
  sendData({ event: 'keyToggle', data: { key, type: 'up' } })
}

const onclick = () => {
  sendData({ event: 'mouseClick', data: { button: 'left', double: false } })
}

const ondblclick = () => {
  sendData({ event: 'mouseClick', data: { button: 'left', double: true } })
}

const oncontextmenu = (e) => {
  e.preventDefault()
  sendData({ event: 'mouseClick', data: { button: 'right', double: false } })
}

// returns promise
export async function sendScreenSize() {
  const { width, height } = await getScreenSize()
  sendData({ event: 'adjustWindowSize', data: { width, height } })
}

export function bindEvent() {
  if (isBind) return
  isBind = true
  video.addEventListener('mousemove', onmousemove)
  video.addEventListener('click', onclick)
  video.addEventListener('dblclick', ondblclick)
  video.addEventListener('contextmenu', oncontextmenu)
  window.addEventListener('keydown', onkeydown)
  window.addEventListener('keyup', onkeyup)
}

export function removeEvent() {
  video.removeEventListener('mousemove', onmousemove)
  video.removeEventListener('click', onclick)
  video.removeEventListener('dblclick', ondblclick)
  video.removeEventListener('contextmenu', oncontextmenu)
  window.removeEventListener('keydown', onkeydown)
  window.removeEventListener('keyup', onkeyup)
  isBind = false
}
