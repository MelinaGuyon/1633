import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import camera from 'controllers/camera'
import Body from 'abstractions/Body'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.perso = this.addChild('elle-0/land')
    this.anim = new Animator(this.refs.perso)
    this.anim.play('elle-0/land', { loop: true, frameDuration: 80 })

    this.base.fakeX = 0
    this.base.fakeY = 0
    this.body = new Body({ group: 'hero', gravity: true })
    this.body.attach(this.base)
    camera.setTarget(this.base)

    setTimeout(() => {
      this.haut()
    }, 1000)

    setTimeout(() => {
      this.bas()
    }, 1500)
  }

  haut () {
    this.body.bas = false
    this.body.haut = true
  }

  bas () {
    this.body.bas = true
    this.body.haut = false
  }

  update (dt, time) {
    this.anim.update(dt)
    this.body.update(dt) // for now, then see with the physics class
    this.body.updateAttachment()
  }
}
