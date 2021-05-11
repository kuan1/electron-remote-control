import json from '../vendor/json.js'
import { bindMoveMouse } from '../vendor/electron.js'

function onReceiveData(e) {
  const { event, data = {} } = json(e.data)
  switch (event) {
    case 'moveMouse':
      bindMoveMouse(data.x, data.y)
      break
    default:
      break
  }
}

export default onReceiveData
