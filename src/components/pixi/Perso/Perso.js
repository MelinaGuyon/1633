import { Container } from 'pixi.js'
import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'

export default class Perso extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.perso = this.addChild('elle-0/land')
    this.anim = new Animator(this.refs.perso)

    this.anim.play('elle-0/land', { loop: true, frameDuration: 80 })
    // need update
  }

  update (dt, time) {
    this.anim.update(dt)
  }
}
