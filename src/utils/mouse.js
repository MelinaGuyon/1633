import logger from './logger'
import store from 'state/store'

function Mouse () {
  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Mouse', '#eda61a').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  function mousemoove (e) {
    store.mouse.set({ x: e.clientX, y: e.clientY })
  }

  function init () {
    window.addEventListener('mousemove', mousemoove, { passive: true })
  }

  function remove () {
    window.removeEventListener('mousemove', mousemoove)
  }

  return {
    use,
    init,
    remove
  }
}
export default Mouse()
