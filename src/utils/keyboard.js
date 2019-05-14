import logger from './logger'
import store from 'state/store'
import signals from 'state/signals'

function Keyboard () {
  let left = { isDown: true }
  let right = { isDown: true }

  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Keyboard', '#eda61a').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  function downListener (event) {
    if (event.key === 'ArrowLeft') {
      left.isDown = false
      signals.goLeft.dispatch(0)
      // console.log('go gauche')
    } else if (event.key === 'ArrowRight') {
      right.isDown = false
      signals.goRight.dispatch(1)
      // console.log('go droite')
    } else if (event.key === ' ') {
      // console.log('histo fact unlocked', signals)
      signals.space.dispatch(2)
    }
  }

  function upListener (event) {
    if (event.key === 'ArrowLeft') {
      left.isDown = true
      if (right.isDown) {
        signals.stop.dispatch(null)
        // console.log('fin gauche')
      }
    }
    if (event.key === 'ArrowRight') {
      right.isDown = true
      if (left.isDown) {
        signals.stop.dispatch(null)
        // console.log('fin droite')
      }
    }
    // if (event.key === ' ') {
    //   signals.stop.dispatch(null)
    // }
  }

  function init () {
    window.addEventListener('keydown', downListener, false)
    window.addEventListener('keyup', upListener, false)
  }

  function remove () {
    window.removeEventListener('keydown', downListener)
    window.removeEventListener('keyup', upListener)
  }

  return {
    use,
    init,
    remove
  }
}
export default Keyboard()
