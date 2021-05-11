import toast from '../vendor/toast.js'
import { friend, user } from './user.js'
import { accessAnswer, close } from './webRTC.js'
import json from '../vendor/json.js'
import { bindEvent } from './bindSendDataEvent.js'

let ws

export function connect({ connectSuccess, gotOffer }) {
  if (ws) return

  ws = new WebSocket(`wss://www.luzhongkuan.cn/websocket?code=${user.code}`)

  let timer
  // nginx 默认一分钟断开链接
  ws.onopen = () => {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      ws.send('ping')
    }, 50 * 1000)
  }

  // 接收到消息
  ws.onmessage = (e) => {
    if (e.data === 'pong') return

    const { success, data, event, fromUser } = json(e.data)
    console.log('socket->', data)

    // 反馈失败
    if (!success) {
      return toast(data)
    }

    // 连接成功
    if (event === 'connect') {
      connectSuccess(data.code)
      return (user.code = data.code)
    }

    if (event === 'friendClose') {
      toast('连接对象断开')
      return close()
    }

    // 发送offer失败 或者发送answer失败
    if (event === 'send offer fail' || event === 'send answer fail') {
      toast('连接对象未找到')
      friend.code = ''
      return close()
    }

    const { action } = data || {}
    switch (action) {
      case 'answer':
        bindEvent()
        accessAnswer(data)
        break
      case 'offer':
        friend.code = fromUser
        gotOffer(data)
        break
      default:
        break
    }
  }

  // socket关闭
  ws.onclose = () => {
    if (timer) clearInterval(timer)
    console.log('socket关闭')
  }
}

export const sendOffer = ({ icecandidades, offer }) => {
  sendToUser({ icecandidades, offer, action: 'offer' }, 'sendOffer')
}

export const sendAnswer = ({ icecandidades, answer }) => {
  sendToUser({ icecandidades, answer, action: 'answer' }, 'sendAnswer')
}

export const closeCtrl = () => {
  sendToUser({}, 'friendClose')
}

function sendToUser(data, event = 'toUser', toUser = friend.code) {
  if (!ws) return console.error('ws is CLOSED')
  if (!toUser) return console.error('toUser is null')
  ws.send(JSON.stringify({ data, toUser, event }))
}
