import { sendData } from './webRTC.js'
import throttle from '../vendor/throttle.js'

const video = document.querySelector('video')

video.onmousemove = throttle((e) => {
  console.log(e)
}, 100)
