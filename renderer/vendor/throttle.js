/**
 * 截流函数
 * @param fn 执行函数
 * @param time 间隔ms
 */
export default function throttle(fn, time = 300) {
  let timer
  let firstInvoke = true
  return throttled

  function throttled(...args) {
    if (firstInvoke) {
      firstInvoke = false
      // @ts-ignore
      return fn.call(this, ...args)
    }
    if (timer) return
    timer = setTimeout(() => {
      // @ts-ignore
      fn.call(this, ...args)
      timer = null
    }, time)
  }
}
