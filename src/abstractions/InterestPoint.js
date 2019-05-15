import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Rectangle, Graphics } from 'pixi.js'
import physics from 'controllers/physics'
import scene from 'controllers/scene'

import store from 'state/store'

export default class InterestPoint extends PixiComponent {
  setup (props) {
    console.log(props, 'ici')
    this.type = props.type || 'a'

    this.base = new Graphics()
    this.base.tint = props.tint || 0xFF00FF
    this.base.lineStyle(4, this.base.tint, 1)
    this.base.beginFill(this.base.tint)
    this.base.drawCircle(24, 24, 24)
    this.base.endFill()

    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.width = this.base.width
    this.height = this.base.height
    this.collide = props.collide

    this.histoFact = props.histoFact

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
        cb: this.unlock.bind(this)
      })
      this.body.attach(this.base)
    }
  }

  unlock () {
    if (this.histoFact >= 0) {
      let id = this.histoFact
      store.factsStatus.current[id] = 'unlocked'
      document.querySelector('#fact' + id + ' .factContent').style.opacity = 0.5
    }
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
