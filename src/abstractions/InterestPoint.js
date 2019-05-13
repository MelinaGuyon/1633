import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Rectangle, Graphics } from 'pixi.js'
import physics from 'controllers/physics'
import scene from 'controllers/scene'

import store from 'state/store'

export default class InterestPoint extends PixiComponent {
  setup (props) {
    this.type = props.type || 'a'

    this.base = new Graphics()
    this.base.tint = props.tint || 0xFF0000
    this.base.lineStyle(4, this.base.tint, 1)
    this.base.beginFill(this.base.tint)
    this.base.drawRect(0, 0, 64, 64)
    this.base.endFill()

    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.width = this.base.width
    this.height = this.base.height
    this.collide = props.collide

    if (this.collide) {
      this.body = physics.addBody({
        group: 'obstacles',
        container: scene[props.layer],
        width: this.base.width,
        height: this.base.height,
        x: this.base.x,
        y: this.base.y,
        anchor: [0.5, 0.5],
        scale: 1,
        cb: this.unlock
      })
      this.body.attach(this.base)
    }
  }

  unlock () {
    console.log('unlock')
  }

  componentWillUnmount () {
    if (this.collide) {
      this.removeBody()
    }
  }

  removeBody () {
    physics.removeBody(this.body)
    this.body = undefined
  }
}
