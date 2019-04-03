import logger from './logger'
import store from 'state/store'

function Keyboard () {

    let left = {isDown: true}
    let right = {isDown: true}
    let vx = 0
    let vy = 0

  function use (config) {
    return new Promise((resolve) => {
      init()
      logger('Use Keyboard', '#47b342').log()
      resolve(config)
    }).catch((err) => { throw new Error(err) })
  }

  function sceneDisplacement (e) {
    store.scenePosition.set({ x: vx })
  }

  function downListener() {
    if (event.key === "ArrowLeft") {
      left.isDown = false
      console.log("go gauche", vx)
      vx = -10
      vy = 0
      // animatedFemale._textures = sheet.animations["elle-0/land"]
    }
 
    else if (event.key === "ArrowRight") { 
      right.isDown = false
      console.log("go droite", vx)
      vx = 10
      vy = 0
      // animatedFemale._textures = sheet.animations["elle-menu/waiting"]
    }
  }

  function upListener() {
    if (event.key === "ArrowLeft") {
      left.isDown = true
      if (right.isDown) {
        console.log("fin gauche", vx)
        vx = 0
        // animatedFemale._textures = sheet.animations["elle-end/dance1"]
      }
    }
    if (event.key === "ArrowRight") {
      right.isDown = true
      if (left.isDown) {
        console.log("fin droite", vx)
        vx = 0
        // animatedFemale._textures = sheet.animations["elle-end/dance1"]
      }
    }
  }

  function init () {
    sceneDisplacement()
    window.addEventListener("keydown", downListener, false)
    window.addEventListener("keyup", upListener, false)
  }

  function remove () {
    window.removeEventListener("keydown", downListener)
    window.removeEventListener("keyup", upListener)
  }

  return {
    use,
    init,
    remove
  }
}
export default Keyboard()
