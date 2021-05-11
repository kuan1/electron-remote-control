const keys = [
  'backspace',
  'delete',
  'enter',
  'tab',
  'escape',
  'up',
  'down',
  'right',
  'left',
  'home',
  'end',
  'pageup',
  'pagedown',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'f10',
  'f11',
  'f12',
  'command',
  'alt',
  'control',
  'shift',
  'right_shift',
  'space',
]

function getKey(key = '') {
  if (!key) return ''
  if (key.length === 1) return key
  key = key.toLowerCase()
  if (keys.includes(key)) return key
  const keyMap = {
    meta: 'command',
    arrowleft: 'left',
    arrowright: 'right',
    arrowdown: 'down',
    arrowup: 'up',
  }
  key = keyMap[key]
  if (key) return key
  return ''
}

export default getKey
