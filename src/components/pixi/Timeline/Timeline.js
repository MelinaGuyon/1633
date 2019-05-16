import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import signals from 'state/signals'

export default class Timeline extends PixiComponent {
  setup () {
    this.base = new Container()
    this.state = {}

    this.base.fakeX = 0
    this.base.fakeY = 0
    this.body = physics.addBody({
      group: 'timeline',
      gravity: true,
      width: this.base.width,
      height: this.base.height
    })
    this.body.attach(this.base)

    this.active()
  }

  active () {
    this.bind()
  }

  bind () {
    // signals.goLeft.listen(this.updateAnimation, this) // 0
  }

  update (dt, time) {
    this.body.updateAttachment()
  }
}
