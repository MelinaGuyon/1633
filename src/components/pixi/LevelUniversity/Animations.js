import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}
    this.oldDirection = null
    this.state = {}

    this.refs.perso = this.addChild('start')
    this.anim = new Animator(this.refs.perso)
    this.anim.play('perso', { loop: true, frameDuration: 30 })
  }

  componentWillUnmount () {
    this.anim.dispose()
  }

  update (dt) {
    console.log('je pass')
    this.anim.update(dt)
  }
}
