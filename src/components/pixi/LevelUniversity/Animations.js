import PixiComponent from 'abstractions/PixiComponent'
import Animator from 'controllers/animator'
import { Container } from 'pixi.js'

export default class Animations extends PixiComponent {
  setup () {
    this.base = new Container()
    this.refs = {}

    this.refs.drapeau = this.addChild('drapeau', { layer: '1f200', x: -400, y: 0 })
    this.refs.drapeau.scale.x = 0.5
    this.refs.drapeau.scale.y = 0.5
    this.animDrapeau = new Animator(this.refs.drapeau)
    this.animDrapeau.play('drapeau', { loop: true, frameDuration: 160 })

    this.refs.hache = this.addChild('hache', { layer: '1f200', x: 430, y: 20 })
    this.refs.hache.scale.x = 0.44
    this.refs.hache.scale.y = 0.44
    this.animHache = new Animator(this.refs.hache)
    this.animHache.play('hache', { loop: true, frameDuration: 160 })
  }

  componentWillUnmount () {
    this.animDrapeau.dispose()
    this.animHache.dispose()
  }

  update (dt) {
    this.animDrapeau.update(dt)
    this.animHache.update(dt)
  }
}
