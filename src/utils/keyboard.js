import logger from './logger'
import store from 'state/store'

function Keyboard () {

  let left = keyboard("ArrowLeft")
  let right = keyboard("ArrowRight")

  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Keyboard', '#47b342').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  // function resize (e) {
  //   store.size.set({ w: window.innerWidth, h: window.innerHeight })
  // }

  function keyboard(value) {
    let key = {}
    key.value = value
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
        event.preventDefault()
      }
    }

    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
        event.preventDefault()
      }
    }

    const downListener = key.downHandler.bind(key)
    const upListener = key.upHandler.bind(key)
    
    return key
  }


  function bind() {
    left.press = function(mouseData) {
      // STORAGE.female.vx = -10
      // STORAGE.female.vy = 0
      // STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-0/land"]
    }
    left.release = function(mouseData) {
      // if (!that.right.isDown && STORAGE.female.vy === 0) {
      //   // STORAGE.female.vx = 0
      //   // STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
      // }
    }

    right.press = function(mouseData) {
      // STORAGE.female.vx = 10
      // STORAGE.female.vy = 0
      // STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-menu/waiting"]
    }
    right.release = function(mouseData) {
      // if (!that.left.isDown && STORAGE.female.vy === 0) {
      //   // STORAGE.female.vx = 0
      //   // STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
      // }
    }
  }


  function init () {
    // window.addEventListener("keydown", downListener, false)
    // window.addEventListener("keyup", upListener, false) 
  }

  function remove () {
    // window.removeEventListener("keydown", downListener)
    // window.removeEventListener("keyup", upListener)  
  }

  return {
    use,
    init,
    remove
  }
}
export default Keyboard()
