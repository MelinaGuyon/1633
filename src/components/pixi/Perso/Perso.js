import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import physics from 'controllers/physics'
import Body from 'abstractions/Body'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.perso = this.addChild('elle-0/land')
    this.anim = new Animator(this.refs.perso)
    this.anim.play('elle-0/land', { loop: true, frameDuration: 80 })
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
      console.log('COLLIDE')
    })
  }

  update (dt, time) {
    this.anim.update(dt)
    this.body.update(dt) // for now, then see with the physics class that will handle collisions
    this.body.updateAttachment()
  }
}
