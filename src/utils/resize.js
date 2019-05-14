import logger from './logger'
import store from 'state/store'

function Resize () {
  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Resize', '#eda61a').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  function resize (e) {
    console.log('resize')
    store.size.set({ w: window.innerWidth, h: window.innerHeight })
  }

  function init () {
    resize()
    window.addEventListener('resize', resize)
  }

  function remove () {
    window.removeEventListener('resize', resize)
  }

  return {
    use,
    init,
    remove
  }
}
export default Resize()
