import logger from './logger'
import store from 'state/store'
import throttle from 'lodash/throttle'

function Resize () {
  let resizeDebounce = throttle(resize, 200)

  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Resize', '#eda61a').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  function resize (e) {
    store.size.set({ w: window.innerWidth, h: window.innerHeight })
  }

  function init () {
    resize()
    window.addEventListener('resize', resizeDebounce)
  }

  function remove () {
    window.removeEventListener('resize', resizeDebounce)
  }

  return {
    use,
    init,
    remove
  }
}
export default Resize()
