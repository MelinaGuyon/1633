/* global IS_DEV */

function noop () {}
const noopObj = { log: noop, warn: noop, error: noop }

export default function logger (namespace, color, disable) {
  if (!IS_DEV || disable) return noopObj
  const prefix = `%c[${namespace}]`
  const style = `color:${color}`
  return {
    log (...msg) { console.log(prefix, style, ...msg) },
    warn (...msg) { console.warn(prefix, style, ...msg) },
    error (...msg) { console.error(prefix, style, ...msg) }
  }
}
