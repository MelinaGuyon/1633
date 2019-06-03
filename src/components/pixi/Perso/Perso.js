import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import signals from 'state/signals'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}
    this.oldDirection = null
    this.state = {}

    this.refs.perso = this.addChild('perso')
    this.anim = new Animator(this.refs.perso)
    this.base.scale.y = 0.3
    this.base.scale.x = 0.3
    this.base.fakeX = 0
    this.base.fakeY = -1 // to let scenes in cneter
    this.base.x = -70
    this.base.y = -100
    this.body = physics.addBody({
      group: 'hero',
      gravity: true,
      width: this.base.width,
      height: this.base.height
    })
    this.body.attach(this.base)
    camera.setTarget(this.base)

    this.bind()
  }

  bind () {
    signals.goLeft.listen(this.updateAnimation, this) // 0
    signals.goRight.listen(this.updateAnimation, this) // 1
    signals.stop.listen(this.updateAnimation, this)
  }

  updateAnimation (direction) {
    if (this.oldDirection !== direction) {
      if (direction === 0) {
        this.base.scale.x = -0.3
        this.base.x = 40
        this.anim.play('perso', { loop: true, frameDuration: 30, firstFrame: this.anim.currentFrame })
      } else if (direction === 1) {
        this.base.scale.x = 0.3
        this.base.x = -70
        this.anim.play('perso', { loop: true, frameDuration: 30, firstFrame: this.anim.currentFrame })
      } else {
        this.anim.stop()
      }
      this.oldDirection = direction
    }
  }

  update (dt, time) {
    this.anim.update(dt)
    this.body.updateAttachment()
  }
}
