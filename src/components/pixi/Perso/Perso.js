import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import signals from 'state/signals'
import Body from 'abstractions/Body'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}
    this.oldDirection = null

    this.refs.perso = this.addChild('animation-static/animation')
    this.anim = new Animator(this.refs.perso)
    this.anim.play('animation-static/animation', { loop: true, frameDuration: 600 })
    console.log(this.base.width, 'perso width')
    this.base.fakeX = 0
    this.base.fakeY = 0
    this.body = physics.addBody({
      group: 'hero',
      gravity: true,
      width: this.base.width,
      height: this.base.height
    })
    this.body.attach(this.base)
    camera.setTarget(this.base)

    /// temp here
    this.body.collideWith('obstacles', (c) => {
      // console.log('COLLIDE')
    })

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
        this.anim.play('animation-left/animation', { loop: true, frameDuration: 600 })
      } else if (direction === 1) {
        this.anim.play('animation-right/animation', { loop: true, frameDuration: 600 })
      } else {
        this.anim.play('animation-static/animation', { loop: true, frameDuration: 600 })
      }
      this.oldDirection = direction
    }
  }

  update (dt, time) {
    this.anim.update(dt)
    this.body.update(dt) // for now, then see with the physics class that will handle collisions
    this.body.updateAttachment()
  }
}
