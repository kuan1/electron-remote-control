import json from '../vendor/json.js'
import { bindMoveMouse, mouseClick, adjustWindowSize, keyToggle } from '../vendor/electron.js'

function onReceiveData(e) {
  const { event, data = {} } = json(e.data)
  // console.log(event, data)
  switch (event) {
    case 'moveMouse':
      bindMoveMouse(data.x, data.y)
      break
    case 'mouseClick':
      mouseClick(data.button, data.double)
      break
    case 'keyToggle':
      keyToggle(data.key.toLowerCase(), data.type)
      break
    case 'adjustWindowSize':
      adjustWindowSize(data.width, data.height)
      break
    default:
      break
  }
}

export default onReceiveData
