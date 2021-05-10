/**
 * @description: copy string
 * @param {String} str
 * @return {Boolean} success
 */
export default (str) => {
  const el = document.createElement('textarea')
  el.setAttribute('readonly', '')
  el.value = str

  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.fontSize = '12pt'

  const selection = document.getSelection()
  let originalRange
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  document.body.appendChild(el)
  el.select()

  el.selectionStart = 0
  el.selectionEnd = str.length

  let success = false
  try {
    success = document.execCommand('copy')
    /* eslint-disable */
  } catch (err) {}

  document.body.removeChild(el)

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  return success
}
