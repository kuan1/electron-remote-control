import copy from '../vendor/copy.js'
import toast from '../vendor/toast.js'
import { friend, user } from './user.js'
import { connect, sendOffer } from './socket.js'
import { initPC, getOfferAndIcecandidades, getAnswerAndIcecandidades } from './webRTC.js'

const connectBtn = document.querySelector('.connect-btn')
const copyBtn = document.querySelector('.copy-icon')
const friendInput = document.querySelector('.friend-code')
const myCodeSpan = document.querySelector('#my-code')

// 设置默认friendCode
setFriendCode(friend.code)

// 链接好友电脑按钮
connectBtn.onclick = connectFirend

// 复制自己的code
copyBtn.onclick = copyMyCode

// 朋友code输入框change事件
friendInput.oninput = function () {
  connectBtn.disabled = !this.value
}

// 链接成功
function connectSuccess(code) {
  user.code = code
  myCodeSpan.innerHTML = code
  copyBtn.style.display = 'inline-block'
}

// 接收到offer
async function gotOffer(data) {
  const { icecandidades, answer } = await getAnswerAndIcecandidades(data)
  sendAnswer({ icecandidades, answer })
}

function setFriendCode(code = '') {
  friendInput.value = code
  connectBtn.disabled = !code
}

async function connectFirend() {
  const remoteCode = document.querySelector('.friend-code').value
  if (!remoteCode) return toast('请输入好友账号')
  if (remoteCode === user.code) return toast('不能链接自己')
  // 链接socket
  connect({ connectSuccess, gotOffer })

  friend.code = remoteCode
  connectBtn.disabled = true
  const video = document.querySelector('.video')
  video.classList.remove('hide')
  await initPC(true, video)
  connectBtn.disabled = false
  const { icecandidades, offer } = await getOfferAndIcecandidades()
  sendOffer({ icecandidades, offer })
  console.log(icecandidades, offer)
}

function copyMyCode() {
  const text = myCodeSpan.innerHTML
  copy(text)
  toast('复制成功', 800)
}
