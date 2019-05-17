import { Container } from 'pixi.js'
import store from 'state/store'
import { lerp, map, clamp, damp } from '@internet/maths'
import preciseDamp from 'utils/preciseDamp'
import PixiComponent from 'abstractions/PixiComponent'
import signals from 'state/signals'

class Camera {
  setup (props) {
    this.x = 1
    this.y = 1

    this.smooth = {
      target: { x: 0, y: 0 }
    }

    this.target = undefined
  }

  update (dt, time) {
    let tx = 0
    let ty = 0
    if (this.target) {
      this.smooth.target.fakeX = preciseDamp(this.smooth.target.fakeX, -this.target.fakeX, 0, dt)
      this.smooth.target.fakeY = preciseDamp(this.smooth.target.fakeY, -this.target.fakeY, 0.007, dt)
      tx = lerp(-this.target.fakeX, this.smooth.target.fakeX, 0.1)
      ty = lerp(-this.target.fakeY, this.smooth.target.fakeY, 0.1)
    }
    this.x = tx
    this.y = ty

    // C'est ici qu'est le reel X car il se fait animer en smooth
    if (this.target && this.target.hasMoved) {
      signals.moving.dispatch(this.x * -1)
      // console.log(this.x * -1)
    }
  }

  setTarget (gameobject, opts = {}) {
    this.target = gameobject
    this.smooth.target.fakeX = -this.target.fakeX
    this.smooth.target.fakeY = -this.target.fakeY
  }
}

const camera = new Camera()
export default camera
